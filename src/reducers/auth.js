import {
  LOGIN_USER,
  SET_CURRENT_USER,
  REGISTER_USER,
  AUTH_ERROR,
  USER_LOGGED_OUT,
  GET_PROFILE_SUCCESS
} from '../actions/types';

const initialState = {
  isAuth: false,
  loding: true,
  user: null,
  registerSuccess: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, ...payload, isAuth: false, registerSuccess: true, user: payload };

    case LOGIN_USER:
      return { ...state, ...payload, isAuth: true, registerSuccess: false, loading: false, user: payload };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: true,
        user: payload
      };
    case AUTH_ERROR:
    case USER_LOGGED_OUT:
      return {
        ...state,
        isAuth: false
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload
      };

    default:
      return state;
  }
};
