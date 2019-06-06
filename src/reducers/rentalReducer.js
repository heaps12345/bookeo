import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTALS_INIT,
  RENTAL_CREATED,
  USER_RENTAL_SUCCESS,
  RENTAL_DELETED_SUCCESS,
  IMAGE_UPLOAD_SUCCESS,
  UPDATE_RENTAL_SUCCESS
} from '../actions/types';

const initialState = {
  rentals: {
    data: [],
    loading: true
  },
  rental: {
    data: []
  },
  img: {
    data: {}
  },
  loading: true
};

export const rentals = (state = initialState.rentals, { type, payload }) => {
  switch (type) {
    case FETCH_RENTALS_INIT:
      return { ...state, data: [] };
    case FETCH_RENTALS:
    case USER_RENTAL_SUCCESS:
    case RENTAL_CREATED:
      return { ...state, data: payload, loading: false };
    case RENTAL_DELETED_SUCCESS:
      
      return { ...state, data: state.data.filter(rentals => rentals.rentalId !== payload) };
    default:
      return state;
  }
};

export const selectedRental = (state = initialState.rental, { type, payload }) => {
  switch (type) {
    case UPDATE_RENTAL_SUCCESS:
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return { ...state, data: payload };

    default:
      return state;
  }
};

export const img = (state = initialState.img, { type, payload }) => {
  switch (type) {
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, loading: false, data: payload };

    default:
      return state;
  }
};
