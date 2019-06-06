import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const paymentCard = ({ payment }) => {
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">{payment.category}</div>
        <div className="card-block">
          <p className="card-text booking-days">
            {moment(payment.startAt).format('MM-DD-YYYY')} - {moment(payment.endAt).format('MM-DD-YYYY')} |{' '}
            {payment.days} days
          </p>
          <p className="card-text booking-price">
            <span>Price: </span> <span className="booking-price-value">{payment.amount}</span>
          </p>
          <Link className="btn btn-main" to="rental detail">
            Go to Rental
          </Link>
        </div>
        <div className="card-footer text-muted">Created {moment(payment.paymentMadeOn).format('MM-DD-YYYY')}</div>
      </div>
    </div>
  );
};

export default paymentCard;
