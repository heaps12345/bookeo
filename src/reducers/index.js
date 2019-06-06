import { combineReducers } from 'redux';
import { rentals, selectedRental, img } from './rentalReducer';
import auth from './auth';
import errors from './errors';
import bookings from './bookings';
import payment from './payment';

export default combineReducers({
  rentals,
  rental: selectedRental,
  auth,
  errors,
  bookings,
  img,
  payment
});
