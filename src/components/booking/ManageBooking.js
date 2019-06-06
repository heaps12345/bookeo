import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserBookings, getPendingPayments } from '../../actions';
import BookingCard from './bookingCard';
//import PaymentCard from './PaymentCard';
import ReviewModal from '../reviews/ReviewModal';

class ManageBooking extends Component {
  state = {
    bookings: []
  };

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.getUserBookings();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuth !== prevProps.auth.isAuth) {
      this.getUserBookings();
    }
  }

  getUserBookings = () => {
    const { auth, bookings } = this.props;
    this.props.getUserBookings(auth.user.id, bookings.bookingId, bookings.rentalId);
  };

  render() {
    const { bookings } = this.props;
    return (
      <Fragment>
        <section id="userBookings">
          <h1 className="page-title">My Bookings</h1>
          <div className="row">
            {bookings &&
              bookings.length > 0 &&
              bookings.map((booking, i) => (
                <BookingCard
                  key={i}
                  booking={booking}
                  reviewModal={() => (
                    <ReviewModal
                      onReviewCreated={() => {
                        this.getUserBookings();
                      }}
                      booking={booking}
                    />
                  )}
                />
              ))}
          </div>
          {!bookings.loading && bookings.length === 0 && (
            <div className="alert alert-warning">
              You have no bookings created go to rentals section and book your place today.
              <Link style={{ marginLeft: '10px' }} className="btn btn-main" to="/rentals">
                Available Rentals
              </Link>
            </div>
          )}
        </section>
        {/* <section id="pendingBookings">
          <h1 className="page-title">Pending Bookings</h1>
          <div className="row">{payments && payments.map(payment => <PaymentCard payment={payment} />)}</div>
          {payments && payments.length === 0 && (
            <div class="alert alert-warning">
              You have no bookings created go to rentals section and book your place today.
              <Link style={{ 'margin-left': '10px' }} class="btn btn-main" to="/rentals">
                Available Rental
              </Link>
            </div>
          )}
          </section> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bookings: state.bookings.data,
  rentals: state.rentals.data,
  auth: state.auth,
  payments: state.payment.data,
  review: state.bookings.review
});

export default connect(
  mapStateToProps,
  { getUserBookings, getPendingPayments }
)(ManageBooking);
