import React, { Component, Fragment } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';
import { extendMoment } from 'moment-range';
//import Payment from '../payment/Payment';
import { connect } from 'react-redux';
import { createBooking } from '../../actions';
import twix from 'twix';
import DateRangePicker from 'react-bootstrap-daterangepicker';

const moment = extendMoment(Moment);

class Booking extends Component {
  bookedUpDates = [];
  dateRef = React.createRef();
  state = {
    proposedBooking: {
      startAt: '',
      endAt: '',
      guests: '',

      rental: {}
    },
    modalOpen: false,
    redirect: false
  };

  componentDidMount() {
    this.getBookedDates();
  }

  getBookedDates = () => {
    const start = this.props.rental.starting;
    const end = this.props.rental.ending;

    if (start && start.length > 0) {
      for (let i = 0; i < start.length; i++) {
        var itr = moment.twix(new Date(start[i]), new Date(end[i])).iterate('days');
        var range = [];
        while (itr.hasNext()) {
          range.push(itr.next().format('MM-DD-YYYY'));
        }
        this.bookedUpDates.push(...range);
      }
    }
  };

  

  checkInvalidDates = date => {
    const mDate = date.format('MM-DD-YYYY');
    return this.bookedUpDates.includes(mDate) || date.diff(moment(), 'days') < 0;
  };

  onApply = (event, picker) => {
    const startAt = picker.startDate.format('MM-DD-YYYY');
    const endAt = picker.endDate.format('MM-DD-YYYY');

    this.dateRef.current.value = startAt + ' to ' + endAt;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  };

  selectGuests = e => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(e.target.value, 10)
      }
    });
  };

  resetData = () => {
    this.dateRef.current.value = '';
    this.setState({ proposedBooking: { guests: '' } });
  };

  addNewBookedUpDates = () => {
    const { startAt, endAt } = this.state.proposedBooking;

    var itr = moment.twix(new Date(startAt), new Date(endAt)).iterate('days');
    var range = [];
    while (itr.hasNext()) {
      range.push(itr.next().format('MM-DD-YYYY'));
    }
    this.bookedUpDates.push(...range);
  };

  confirmReservation = () => {
    const { rental } = this.props;
    const { startAt, endAt } = this.state.proposedBooking;

    var itr = moment.twix(new Date(startAt), new Date(endAt)).iterate('days');
    var range = [];
    while (itr.hasNext()) {
      range.push(itr.next().format('MM-DD-YYYY'));
    }
    const days = range.length;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate
      },
      modalOpen: true
    });
  };

  cancelReservation = () => {
    this.setState({
      modalOpen: false
    });
  };

  reserveRental = () => {
    const { rental, auth } = this.props;
    const { proposedBooking } = this.state;

    this.props.createBooking(proposedBooking, rental, rental.rentalId, auth.user.id);
    this.cancelReservation();
  };

  render() {
    const {
      rental,
      errors,
      auth: { isAuth }
    } = this.props;
    const { startAt, endAt, guests } = this.state.proposedBooking;

    return (
      <div className="booking sticky-top'">
        <div className="booking-top ">
          <h3 className="booking-price">
            ${rental.dailyRate}
            <span className="booking-per-night"> per night</span>
          </h3>
        </div>
        <hr />

        {isAuth ? (
          <Fragment>
            <div className="form-group">
              <label htmlFor="dates">Dates</label>

              <DateRangePicker
                onApply={this.onApply}
                isInvalidDate={this.checkInvalidDates}
                opens="left"
                containerStyles={{ display: 'block' }}
              >
                <input ref={this.dateRef} id="dates" type="text" className="form-control" />
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                value={this.state.proposedBooking.guests}
                onChange={this.selectGuests}
                type="number"
                className="form-control"
                id="guests"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
            {errors &&
              errors.length > 0 &&
              errors.map((error, i) => {
                return (
                  error.param === 'dates' && (
                    <p style={{ fontSize: '.9em' }} key={i} className="alert alert-danger">
                      {error.msg}
                    </p>
                  )
                );
              })}

            <button
              disabled={!startAt || !endAt || !guests}
              onClick={this.confirmReservation}
              className="btn btn-main btn-confirm btn-block"
            >
              Book
            </button>
          </Fragment>
        ) : (
          <Link to="/login" className="btn btn-main btn-confirm btn-block">
            Login to book a place
          </Link>
        )}

        <hr />
        <div style={{ display: 'flex' }}>
          <div>
            <p className="booking-note-title">This home is on people’s minds.</p>
            <p className="booking-note-text">It’s been viewed 500+ times in the past week.</p>
          </div>
          <img src={process.env.PUBLIC_URL + '/img/light-bulb.gif'} style={{ height: 'minContent' }} alt="" />
        </div>
        <BookingModal
          rentalPrice={rental.dailyRate}
          booking={this.state.proposedBooking}
          open={this.state.modalOpen}
          closeModal={this.cancelReservation}
          confirmModal={this.reserveRental}
          rental={this.props.rental}
          errors={errors}
          reserveRental={this.reserveRental}
          /*  payment={() => (
            <Payment
              booking={this.state.proposedBooking}
              setPaymentToken={this.setPaymentToken}
              rental={this.props.rental}
              reserveRental={this.reserveRental}
            />
        )}  */
        />
      </div>
    );
  }
}

const mapStateToprops = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToprops,
  { createBooking }
)(Booking);
