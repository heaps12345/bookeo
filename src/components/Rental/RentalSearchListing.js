import React, { Component } from 'react';
import RentalCard from './RentalCard';
import { connect } from 'react-redux';
import { fetchRentals } from '../../actions';

class RentalSearchListing extends Component {
  state = {
    searchCity: ''
  };

  componentDidMount() {
    this.searchRentalByCity();
  }

  componentDidUpdate(prevProps) {
  
    const currentCity = this.props.match.params.city;
    const prevCity = prevProps.match.params.city;
    if (currentCity !== prevCity) {
      this.searchRentalByCity(currentCity);
    }
  }

  searchRentalByCity = () => {
    const city = this.props.match.params.city;
    this.setState({ searchCity: city });
    this.props.fetchRentals(city);
  };

  renderTitle = () => {
    const { errors, rentals } = this.props;
    const { searchCity } = this.state;
    let title = '';

    if (errors.length > 0) {
      title = (
        <h2 className="page-title">
          No results. <br /> We couldn't find anything matching your search. <br /> Try searching other keywords.
        </h2>
      );
    }
    if (rentals.length > 0) {
      title = (
        <h1 className="page-title">
          Your home(s) in <span style={{ textTransform: 'capitalize', color: '#ff373f' }}>{searchCity}</span>
        </h1>
      );
    }
    return <div>{title}</div>;
  };

  renderRentals = () => {
    return this.props.rentals.map((rental, index) => {
      return <RentalCard colNum="col-md-3 col-xs-6" key={index} rental={rental} />;
    });
  };

  render() {
    return (
      <section id="rentalListing">
        {this.renderTitle()}
        <div className="row">{this.renderRentals()}</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  rentals: state.rentals.data,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchRentals }
)(RentalSearchListing);
