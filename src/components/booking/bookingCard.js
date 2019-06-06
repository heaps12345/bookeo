import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const bookingCard = ({ booking, reviewModal }) => {
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">{booking.category}</div>
        <div className="card-block">
          <h4 className="card-title">
            {booking.title} - <span style={{ textTransform: 'capitalize' }}>{booking.city}</span>
          </h4>

          <p className="card-text booking-days">
            {moment(booking.startAt).format('MM-DD-YYYY')} - {moment(booking.endAt).format('MM-DD-YYYY')} |{' '}
            {booking.days} days
          </p>
          <p className="card-text booking-card-price">
            <span>Price: </span> <span className="booking-price-value">{booking.totalPrice}</span>
          </p>
          <Link className="btn btn-main" to={`/rental/${booking.rentalId}`}>
            Go to Rental
          </Link>
          {!booking.hasReview && reviewModal()}
        </div>
        <div className="card-footer text-muted">Created {moment(booking.createdAt).format('MM-DD-YYYY')}</div>
      </div>
    </div>
  );
};

export default bookingCard;
