import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY = 'your key!';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => (
  <Elements stripe={stripeTestPromise}>
    <CheckoutForm />
  </Elements>
);

export default Stripe;
