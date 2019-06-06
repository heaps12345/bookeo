import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_ERROR,
  SET_CURRENT_USER,
  GET_ERRORS,
  USER_LOGGED_OUT,
  CLEAR_ERRORS,
  FETCH_RENTALS_INIT,
  RENTAL_CREATED,
  USER_RENTAL_SUCCESS,
  USER_BOOKING_SUCCESS,
  RENTAL_DELETED_SUCCESS,
  IMAGE_UPLOAD_SUCCESS,
  BOOKING_CREATED,
  UPDATE_RENTAL_SUCCESS,
  PENDING_PAYMENTS_SUCCESS,
  MAKE_PAYMENT_SUCCESS,
  REVIEW_CREATED_SUCCESS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_AVG_SUCCESS,
  GET_PROFILE_SUCCESS
} from './types';
import { history } from '../index';
import { toast } from 'react-toastify';

import axios from 'axios';
axios.defaults.withCredentials = true;

export const fetchRentals = city => async dispatch => {
  const url = city ? `rentals?city=${city}` : 'rentals';

  if (city) {
    dispatch({ type: FETCH_RENTALS_INIT });
  }
  try {
    const res = await axios.get(`https://still-castle-84291.herokuapp.com/${url}`);

    dispatch({ type: FETCH_RENTALS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data.errors });
  }
};

export const fetchRentalById = rentalId => async dispatch => {
  const res = await axios.get(`https://still-castle-84291.herokuapp.com/rentals/${rentalId}`);

  dispatch({ type: FETCH_RENTAL_BY_ID_SUCCESS, payload: res.data });
};

export const createRental = data => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    title: data.title,
    city: data.city,
    street: data.street,
    category: data.category,
    image: data.image,
    dailyRate: data.dailyRate,
    description: data.description,
    bedrooms: data.bedrooms,
    userId: data.userId,
    username: data.username,
    userImg: data.userImg
  });

  try {
    const res = await axios.post('https://still-castle-84291.herokuapp.com/rentals', body, config);

    dispatch({
      type: RENTAL_CREATED,
      payload: res.data
    });
    history.push('/rentals');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data.errors
    });
  }
};

export const loginUser = userData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    email: userData.email,
    password: userData.password
  });
  try {
    const res = await axios.post('https://still-castle-84291.herokuapp.com/users/login', body, config);

    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data.errors
    });
  }
};

// Register User
export const registerUser = (userData, history) => async dispatch => {
  dispatch(clearErrors());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    username: userData.username,
    email: userData.email,
    img: userData.img,
    gender: userData.gender,
    password: userData.password
  });

  try {
    const res = await axios.post('https://still-castle-84291.herokuapp.com/users/register', body, config);

    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });
    history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data.errors
    });
  }
};

export const loggedInCheck = () => async dispatch => {
  try {
    const res = await axios.get('https://still-castle-84291.herokuapp.com/');

    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const logoutUser = () => async dispatch => {
  const res = await axios.get('https://still-castle-84291.herokuapp.com/users/logout');
  dispatch({
    type: USER_LOGGED_OUT,
    data: res.data
  });
};

// export co

export const createBooking = (booking, rental, id, userId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    booking,
    rental,
    bookingId: id,
    userId: userId
  });
  try {
    const res = await axios.post('https://still-castle-84291.herokuapp.com/bookings/new', body, config);

    dispatch({
      type: BOOKING_CREATED,
      payload: res.data
    });
    dispatch(clearErrors());
    toast.success('Booking has been created successfully');
    history.push(`/bookings/manage/${userId}`);
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data.errors });
  }
};

export const getUserBookings = (userId, rentalId, bookingId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    // userId,
    rentalId,
    bookingId
  });

  const res = await axios.put(`https://still-castle-84291.herokuapp.com/bookings/manage/${userId}`, body, config);

  dispatch({
    type: USER_BOOKING_SUCCESS,
    payload: res.data
  });
};

export const getUserRentals = (userId, rentalId, bookingId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    userId,
    rentalId,
    bookingId
  });

  const res = await axios.put(`https://still-castle-84291.herokuapp.com/rentals/manage/${userId}`, body, config);

  dispatch({
    type: USER_RENTAL_SUCCESS,
    payload: res.data
  });
};

export const deleteRental = rentalId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  await axios.delete(`https://still-castle-84291.herokuapp.com/rentals/${rentalId}`, config);

  dispatch({
    type: RENTAL_DELETED_SUCCESS,
    payload: rentalId
  });
};

export const uploadImage = image => async dispatch => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const res = await axios.post('https://still-castle-84291.herokuapp.com/imageUpload', formData);
    dispatch({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data.errors });
  }
};

export const updateRental = (evt, rentalId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    [evt.currentTarget.id]: evt.currentTarget.innerText
  });

  const res = await axios.put(`https://still-castle-84291.herokuapp.com/rentals/${rentalId}`, body, config);
  dispatch({
    type: UPDATE_RENTAL_SUCCESS,
    payload: res.data
  });
  // .catch(({ response }) => {
  //   debugger;
  //   Promise.reject(response.data.errors);
  // });
};

export const makePayment = data => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    amount: data.amount,

    ownerId: data.ownerId,
    token: data.token,
    email: data.email
  });

  const res = await axios.post(`https://still-castle-84291.herokuapp.com/payment`, body, config);
  dispatch({
    type: MAKE_PAYMENT_SUCCESS,
    payload: res.data
  });
  // .catch(({ response }) => {
  //   debugger;
  //   Promise.reject(response.data.errors);
  // });
};

export const getPendingPayments = userId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    userId
  });

  const res = await axios.put('https://still-castle-84291.herokuapp.com/payment', body, config);

  dispatch({
    type: PENDING_PAYMENTS_SUCCESS,
    payload: res.data
  });
};

export const createReview = (text, rating, id, username, img, rentalId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    text,
    id,
    rating,
    username,
    img
  });

  const res = await axios.post(`https://still-castle-84291.herokuapp.com/reviews/${rentalId}`, body, config);

  dispatch({
    type: REVIEW_CREATED_SUCCESS,
    payload: res.data
  });
};

export const getReviews = rentalId => async dispatch => {
  const res = await axios.get(`https://still-castle-84291.herokuapp.com/reviews/${rentalId}`);

  dispatch({
    type: GET_REVIEWS_SUCCESS,
    payload: res.data
  });
};
export const getAvgReviews = reviewId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    reviewId
  });

  const res = await axios.put(`https://still-castle-84291.herokuapp.com/reviews`, body, config);

  dispatch({
    type: GET_REVIEWS_AVG_SUCCESS,
    payload: res.data
  });
};
export const getUserProfile = id => async dispatch => {
  const res = await axios.get(`https://still-castle-84291.herokuapp.com/profile/${id}`);

  dispatch({
    type: GET_PROFILE_SUCCESS,
    payload: res.data
  });
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
