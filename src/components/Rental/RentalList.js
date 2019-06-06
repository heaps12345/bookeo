import React, { Component } from 'react';
import RentalCard from './RentalCard';
import { connect } from 'react-redux';
import { fetchRentals, getAvgReviews } from '../../actions';

class RentalList extends Component {
  state = {};

  renderRentals = () => {
    return this.props.rentals.map((rental, index) => {
      return (
        <RentalCard
          colNum="col-md-3 col-xs-6"
          avg={this.props.getAvgReviews(rental.rentalId)}
          key={index}
          rental={rental}
        />
      );
    });
  };

  getAvgReviews = () => {
    this.props.getAvgReviews();
  };

  componentDidMount() {
    this.props.fetchRentals();
  }

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">
          <span className='clonebnb'>Clonebnb</span> Book unique homes and experience a city like a local.
        </h1>
        <div className="row">{this.renderRentals()}</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  rentals: state.rentals.data,
  reviews: state.bookings.review
});

export default connect(
  mapStateToProps,
  { fetchRentals, getAvgReviews }
)(RentalList);
