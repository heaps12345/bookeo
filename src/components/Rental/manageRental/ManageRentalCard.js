import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ManageRentalModal from './ManageRentalModal';
import { connect } from 'react-redux';
import { deleteRental } from '../../../actions';

class ManageRentalCard extends Component {
  state = {
    deleteMenu: false
  };
  openDeleteMenu = () => {
    this.setState({
      deleteMenu: true
    });
  };
  closeDeleteMenu = () => {
    this.setState({
      deleteMenu: false
    });
  };

  deleteRental = (rentalId, index) => {
    this.props.deleteRental(rentalId);
    // this.props.rentals.splice(index, 1);
    this.closeDeleteMenu();
  };

  render() {
    const { rental, index } = this.props;
    const { deleteMenu } = this.state;
    const deleteClass = deleteMenu ? 'toBeDeleted' : '';
    return (
      <div className="col-md-4">
        <div className={`card text-center ${deleteClass}`}>
          <div className="card-block">
            <h4 className="card-title">{rental && rental.title}</h4>
            <Link className="btn btn-main" to={`/rental/${rental.rentalId}`}>
              Go to Rental
            </Link>
            {rental.ending && rental.starting && <ManageRentalModal rental={rental} />}
          </div>
          <div className="card-footer text-muted">
            Created {moment(rental.createdAt).format('MM-DD-YYYY')}
            {!deleteMenu && (
              <Fragment>
                <button onClick={this.openDeleteMenu} className="btn btn-danger">
                  Delete
                </button>
                <Link
                  className="btn btn-alert"
                  to={{ pathname: `/rental/${rental.rentalId}`, state: { isUpdate: true } }}
                >
                  Edit
                </Link>
              </Fragment>
            )}
            {deleteMenu && (
              <div className="deleteMenu">
                Are you sure?
                <button onClick={() => this.deleteRental(rental.rentalId, index)} className="btn btn-success">
                  Yes
                </button>
                <button onClick={this.closeDeleteMenu} className="btn btn-danger">
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  rentals: state.rentals.data
});

export default connect(
  mapStateToProps,
  { deleteRental }
)(ManageRentalCard);
