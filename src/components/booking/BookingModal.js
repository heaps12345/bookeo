import React from 'react';
import Modal from 'react-responsive-modal';

const BookingModal = ({
  open,
  closeModal,
  booking,
  rentalPrice,
  confirmModal,
  rental,
  errors,
  payment,
  disabled,
  reserveRental
}) => {
  return (
    <Modal open={open} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
      <h4 className="modal-title title">Confirm Booking </h4>
      <p className="dates">
        {booking.startAt} to {booking.endAt}
      </p>
      <div className="modal-body">
        <em>{booking.days}</em> nights - <em>${rentalPrice}</em> per Night
        <p>
          Guests: <em>{booking.guests}</em>
        </p>
        <p>
          Price: <em>${booking.totalPrice}</em>
        </p>
        {payment && payment()}
        <p>Do you confirm your booking for selected days?</p>
      </div>

      <div className="modal-footer">
        <button onClick={reserveRental} type="button" className="btn btn-main">
          Confirm
        </button>
        <button type="button" onClick={closeModal} className="btn btn-bwm">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default BookingModal;
