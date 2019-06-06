import { PENDING_PAYMENTS_SUCCESS, MAKE_PAYMENT_SUCCESS } from '../actions/types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MAKE_PAYMENT_SUCCESS:
    case PENDING_PAYMENTS_SUCCESS:
      return { ...state, data: payload };

    default:
      return state;
  }
};
