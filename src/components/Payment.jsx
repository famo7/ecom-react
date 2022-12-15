import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import '../../payment.css';
import { useLocation } from 'react-router-dom';

const Payment = ({ chosenProducts, user }) => {
  const { state } = useLocation();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    axios.get('/api/config').then((i) => {
      const { publishablekey } = i.data;
      setStripePromise(loadStripe(publishablekey));
    });
  }, []);
  useEffect(() => {
    axios
      .post('/api/create-payment-intent', {
        chosenProducts,
        token: user.token,
        id: state,
      })
      .then((i) => {
        const { clientSecret } = i.data;
        setClientSecret(clientSecret);
      });
  }, []);

  return (
    <div className="container">
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
