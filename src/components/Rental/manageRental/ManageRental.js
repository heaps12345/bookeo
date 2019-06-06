import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserRentals } from '../../../actions';
import ManageRentalCard from './ManageRentalCard';

class ManageRental extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.getUserRentals();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuth !== prevProps.auth.isAuth) {
      this.getUserRentals();
    }
  }

  getUserRentals = () => {
    const { auth, rentals } = this.props;
    this.props.getUserRentals(auth.user.id, rentals.bookingId, rentals.rentalId);
  };
  render() {
    const { rentals } = this.props;

    return (
      <section id="userRentals">
        <h1 className="page-title">My Rentals</h1>
        <div className="row">
          {rentals &&
            rentals.map((rental, i) => {
              return <ManageRentalCard rental={rental} key={i} />;
            })}
        </div>
        {!rentals.loading && rentals.length === 0 && (
          <div className="alert alert-warning">
            You dont have any rentals currenty created. If you want advertised your property please follow this link.
            <Link style={{ marginLeft: '10px' }} className="btn btn-main" to="/rentals/new">
              Register a Rental
            </Link>
          </div>
        )}
      </section>
    );
  }
}
const mapStateToProps = state => ({
  rentals: state.rentals.data,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserRentals }
)(ManageRental);
