import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRentalById, getReviews, getAvgReviews } from '../../../actions';
import UpdateRental from './UpdateRental';
import RentalFeatures from './RentalFeatures';
import RentalDetailMap from './RentalDetailMap';
import Booking from '../../booking/Booking';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import Loader from 'react-loader-spinner';

class RentalDetail extends Component {
  state = {};
  componentDidMount = () => {
    const rentalId = this.props.match.params.id;
    this.props.fetchRentalById(rentalId);
    this.props.getReviews(rentalId);
    this.props.getAvgReviews(rentalId);
  };

  renderRentalFeatures = rental => {
    const { isUpdate } = this.props.location.state || false;

    return isUpdate ? <UpdateRental rental={rental} /> : <RentalFeatures auth={this.props.auth} rental={rental} />;
  };

  render() {
    const { rental, reviews } = this.props;
    if (rental) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <RentalDetailMap location={`${rental.city}, ${rental.street}`} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">{this.renderRentalFeatures(rental)}</div>
              <div className="col-md-4">
                <Booking rental={rental} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <section style={{ marginBottom: '40px' }}>
                  <h2 style={{ marginBottom: '24px', marginTop: '10px' }}>Reviews</h2>
                  {reviews &&
                    reviews.length > 0 &&
                    reviews.map((review, i) => {
                      return (
                        <div key={i} className="review-card">
                          <div className="cardBody">
                            <div className="row">
                              <div className="col-md-2 user-image">
                                <img src={review.userImg} className="img img-rounded img-fluid" alt="" />
                                <p className="text-secondary text-center">{moment(review.createdAt).fromNow()}</p>
                              </div>
                              <div className="col-md-10">
                                <div>
                                  <strong>{review.username}</strong>

                                  <div className="review-section">
                                    <StarRatingComponent
                                      className="detail-stars"
                                      name="rate1"
                                      starCount={5}
                                      value={parseFloat(review.rating)}
                                      starColor={'#008489'}
                                      emptyStarColor={'#cbd3e3'}
                                    />
                                    {/*   <StarRatings
                                      rating={review.rating}
                                      starRatedColor="orange"
                                      starHoverColor="orange"
                                      starDimension="25px"
                                      starSpacing="2px"
                                      numberOfStars={5}
                                      name="rating"
                                 /> */}
                                  </div>
                                </div>
                                <div className="clearfix" />
                                <p>{review.text}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </section>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <div className="loadingContainer">
          <Loader type="Oval" color="#ff373f" height="50" width="50" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  rental: state.rental.data[0],
  reviews: state.bookings.review,
  auth: state.auth.user
});

export default connect(
  mapStateToProps,
  { fetchRentalById, getReviews, getAvgReviews }
)(RentalDetail);
