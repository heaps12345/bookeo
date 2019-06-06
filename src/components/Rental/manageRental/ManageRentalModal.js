import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import moment from 'moment';

export default class ManageRentalModal extends Component {
  bookings = [];
  state = {
    open: false
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  // renderBookings = () => {

  // };

  renderBookings = rental => {
    if (rental.starting && rental.ending) {
      this.bookings = [];
      for (let i = 0; i < rental.starting.length; i++) {
        this.bookings.push(
          <Fragment>
            <p>
              <span>Dates:</span> {moment(rental.starting[i]).format('MM-DD-YYYY')} to{' '}
              {moment(rental.ending[i]).format('MM-DD-YYYY')}
            </p>

            {i + 1 !== rental.starting.length && <hr />}
          </Fragment>
        );
      }
    }
  };

  render() {
    const { rental } = this.props;
    return (
      <React.Fragment>
        <button type="button" onClick={this.openModal} className="btn btn-main">
          Bookings
        </button>
        <Modal open={this.state.open} onClose={this.closeModal} little classNames={{ modal: 'rental-booking-modal' }}>
          <h4 className="modal-title title">Made Bookings</h4>
          <div className="modal-body bookings-inner-container">
            {this.renderBookings(rental)}
            {this.bookings.length > 0 &&
              this.bookings.map((booking, i) => {
                return <div key={i}> {booking.props.children} </div>;
              })}
          </div>
          <div className="modal-footer">
            <button type="button" onClick={this.closeModal} className="btn btn-main">
              Cancel
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
