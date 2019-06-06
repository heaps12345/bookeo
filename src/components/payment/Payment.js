import React, { Component } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from 'react-stripe-elements';

export default class Payment extends Component {
  render() {
    return (
      <div className="payment">
        <Elements>
          <CheckoutForm {...this.props} />
        </Elements>
      </div>
    );
  }
}
