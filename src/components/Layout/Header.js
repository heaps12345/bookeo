import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import RentalSearchField from '../Rental/RentalSearchField';

class Header extends Component {
  state = {};

  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/login');
  };
  render() {
    const { isAuth, user } = this.props.auth;

    return (
      <nav className="navbar navbar-light navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/rentals">
            <img src={process.env.PUBLIC_URL + '/img/logo6.png'} className="logo" alt="" />
          </Link>
          <RentalSearchField />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <a className="nav-item nav-link active" href="##">
                {isAuth && user && user.username}
              </a>
              {isAuth && (
                <Fragment>
                  <div className="nav-item dropdown">
                    <a
                      className="nav-link nav-item dropdown-toggle"
                      href="##"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Owner Section
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <Link className="dropdown-item" to="/rentals/new">
                        Create Rental
                      </Link>
                      <Link className="dropdown-item" to={`/rentals/manage/${this.props.auth.user.id}`}>
                        Manage Rentals
                      </Link>
                      <Link className="dropdown-item" to={`/bookings/manage/${this.props.auth.user.id}`}>
                        Manage Bookings
                      </Link>
                    </div>
                  </div>
                  {/* <Link className="nav-item nav-link" to={`/profile/${this.props.auth.user.id}`}>
                    Profile <span className="sr-only">(current)</span>
              </Link> */}
                </Fragment>
              )}

              {isAuth ? (
                <a className="nav-item nav-link" href="##" onClick={this.handleLogout}>
                  Logout
                </a>
              ) : (
                <Fragment>
                  <Link className="nav-item nav-link" to="/login">
                    Login <span className="sr-only">(current)</span>
                  </Link>
                  <Link className="nav-item nav-link" to="/register">
                    Register
                  </Link>{' '}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Header)
);
