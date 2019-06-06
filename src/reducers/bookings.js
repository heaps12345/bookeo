import {
  BOOKING_CREATED,
  USER_BOOKING_SUCCESS,
  REVIEW_CREATED_SUCCESS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_AVG_SUCCESS
} from '../actions/types';

const initialState = {
  data: [],
  loading: true,
  review: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKING_CREATED:
    case USER_BOOKING_SUCCESS:
      return { ...state, data: payload, loading: false };
    case REVIEW_CREATED_SUCCESS:
    case GET_REVIEWS_SUCCESS:
      return { ...state, review: payload, loading: false };
    case GET_REVIEWS_AVG_SUCCESS:
      return { ...state, avgReview: payload, loading: false };
    default:
      return state;
  }
};
