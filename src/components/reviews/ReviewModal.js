import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import { createReview } from '../../actions';

class ReviewModal extends Component {
  state = {
    open: false,
    text: '',
    rating: 3
  };

  closeModal = () => {
    this.setState({
      open: false
    });
  };

  openModal = () => {
    this.setState({ open: true });
  };

  handleTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  confirmReview = () => {
    const { text, rating } = this.state;
    const { booking, auth } = this.props;

    this.props.createReview(text, rating, booking.id, auth.user.username, auth.user.img, booking.rentalId);
    this.props.onReviewCreated();
    this.closeModal();
  };
  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };
  render() {
    const { open, text, rating } = this.state;
    return (
      <Fragment>
        <button style={{ marginLeft: '10px' }} className="btn btn-main" onClick={this.openModal}>
          Review
        </button>
        <Modal open={open} onClose={this.closeModal} little classNames={{ modal: 'booking-modal' }}>
          <h4 className="modal-title title">Write a Review</h4>

          <div className="modal-body">
            <textarea
              vlaue={text}
              className="form-control"
              placeholder="Tell us about your experience"
              rows={3}
              col={75}
              onChange={this.handleTextChange}
            />
            <StarRatings
              rating={this.state.rating}
              starRatedColor="orange"
              starHoverColor="orange"
              starDimension="25px"
              starSpacing="2px"
              changeRating={this.changeRating}
              numberOfStars={5}
              name="rating"
            />
          </div>

          <div className="modal-footer">
            <button disabled={!text || !rating} onClick={this.confirmReview} type="button" className="btn btn-main">
              Confirm
            </button>
            <button type="button" onClick={this.closeModal} className="btn btn-bwm">
              Cancel
            </button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bookings: state.bookings.data,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { createReview }
)(ReviewModal);
