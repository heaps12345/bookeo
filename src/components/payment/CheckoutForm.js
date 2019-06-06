import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { createOptions, formStyles, buttonStyles, paragraphStyles } from './Styles';
import { makePayment } from '../../actions';

class CheckoutForm extends Component {
  state = {
    error: undefined
  };
  onSubmit = async e => {
    const { stripe, setPaymentToken } = this.props;
    e.preventDefault();

    if (stripe) {
      const payload = await stripe.createToken();
      if (payload.error) {
        setPaymentToken(undefined);
        return this.setState({
          error: payload.error.message
        });
      } else {
        this.props.reserveRental();

        const payment = {
          amount: this.props.booking.totalPrice,
          ownerId: this.props.rental.ownerId,
          token: payload.token.id,
          email: this.props.auth.user.email
        };
        this.props.makePayment(payment);
      }
    } else {
      console.error('Stripe.js hasnt loaded yet');
    }
  };
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit} {...formStyles()}>
        <CardElement {...createOptions()} />
        <p {...paragraphStyles()}>You will not be charged yet.</p>
        {error && <div className="alert alert-danger alert-payment">{error}</div>}
        <button className="btn btn-success" {...buttonStyles()}>
          Confirm Payment
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  bookings: state.bookings.data,
  rentals: state.rentals.data,
  auth: state.auth,
  payment: state.payment.data
});

export default injectStripe(
  connect(
    mapStateToProps,
    { makePayment }
  )(CheckoutForm)
);
