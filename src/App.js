import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Layout/Header';
import RentalList from './components/Rental/RentalList';
// import RentalDetail from './components/Rental/rentalDetails/RentalDetails';
// import RentalCard from './components/Rental/RentalCard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { loggedInCheck } from './actions';

import PrivateRoute from './components/common/privateRoute';
import { ToastContainer } from 'react-toastify';

// Redux
import store from './store';

import RentalDetail from './components/Rental/rentalDetails/RentalDetails';
import RentalSearchListing from './components/Rental/RentalSearchListing';
import CreateRental from './components/Rental/CreateRental';
import ManageBooking from './components/booking/ManageBooking';
import ManageRental from './components/Rental/manageRental/ManageRental';
// import Profile from './components/auth/Profile';

class App extends Component {
  componentDidMount() {
    store.dispatch(loggedInCheck());
  }
  render() {
    return (
      <div className="App">
        <Header />

        <div className="container">
          <Route exact path="/" render={() => <Redirect to="/rentals" />} />

          <Route exact path="/rentals" component={RentalList} />
          <Switch>
            <PrivateRoute exact path="/rentals/new" component={CreateRental} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/rentals/manage/:id" component={ManageRental} />
          </Switch>
          <Route exact path="/rental/:id" component={RentalDetail} />
          <Switch>
            <PrivateRoute exact path="/bookings/manage/:id" component={ManageBooking} />
          </Switch>
          <Route exact path="/rentals/:city/homes" component={RentalSearchListing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
