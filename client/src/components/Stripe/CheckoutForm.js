/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { GeneralContext } from '../../context/General';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [fail, setFail] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();
  const {
    allBoxes, order, setOrder, loggedIn, userData, setUserData,
  } = useContext(GeneralContext);

  if (success) {
    return (
      <div>
        <p>Your payment was successful</p>
        <img src={success[0]} alt="box" />
        <p>
          Name:
          {success[1]}
        </p>
        <p>
          Type:
          {success[2]}
        </p>
        <p>
          People:
          {success[3]}
        </p>
        <p>
          Price:
          {success[4]}
        </p>
      </div>
    );
  }

  if (!order || order.length === 0) {
    window.location = '/';
  }

  if (!allBoxes || !userData || userData.length === 0) {
    return null;
  }

  const box = allBoxes.filter(b => b._id === order[0]);
  const boxOption = box[0].boxPrice.peopleFour.priceId === order[1] ? box[0].boxPrice.peopleFour : box[0].boxPrice.peopleTwo;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setFail(false);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      if (error) throw new Error('Payment failed. Please, try again.');

      const { id } = paymentMethod;
      const newPayment = {
        email: userData[0].email,
        pm: id,
        priceId: boxOption.priceId,
        stripeId: userData[0].stripeId,
      };
      const paymentResponse = await fetch('http://localhost:8001/api/payment', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify(newPayment),
      });

      if (!paymentResponse.ok) throw new Error('Payment failed. Please, try again.');
      const payment = await paymentResponse.json();

      const updateUser = {
        oktaId: loggedIn.accessToken.claims.uid,
      };
      if (!userData[0].stripeId) {
        updateUser.stripeId = payment.customer;
      }
      if (e.target[5].value) {
        updateUser.street = e.target[2].value;
        updateUser.postalCode = e.target[3].value;
        updateUser.city = e.target[4].value;
      }
      const updateUserResponse = await fetch('http://localhost:8001/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
        },
        method: 'PUT',
        body: JSON.stringify(updateUser),
      });

      if (!updateUserResponse.ok) throw new Error('Something went wrong. Please, contact our support team.');
      const updatedUser = await updateUserResponse.json();
      setUserData([updatedUser]);

      const newOrder = {
        orderId: uuidv4(),
        oktaId: loggedIn.accessToken.claims.uid,
        stripeId: userData[0].stripeId || updatedUser.stripeId,
        subscriptionId: payment.id,
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        street: e.target[2].value,
        postalCode: e.target[3].value,
        city: e.target[4].value,
        boxId: order[0],
        people: boxOption.people,
        price: boxOption.price,
        priceId: boxOption.priceId,
        date: new Date().toLocaleDateString('en-GB'),
      };
      const saveOrder = await fetch('http://localhost:8001/api/orders', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify(newOrder),
      });
      if (!saveOrder.ok) throw new Error('Something went wrong. Please, contact our support team.');
      setSuccess([box[0].img, box[0].name, box[0].type, boxOption.people, boxOption.price]);
      setOrder([]);
    } catch (err) {
      setLoading(false);
      setFail(err.message);
    }
  };

  return (
    <div key={box[0]._id} className="box">
      <h1>Checkout</h1>
      <p>Call to place an order: 1234567890</p>
      <p>You ordered:</p>
      <img src={box[0].img} alt="place holder" />
      <p className="box__name">{box[0].name}</p>
      <p className="box__type">{box[0].type}</p>
      <p>
        for
        {boxOption.people}
      </p>
      <p>
        {boxOption.price}
      </p>
      <p>You will enjoy your box on Sunday. (Calculate date based on order date)</p>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="firstname">
          First name
          <input type="text" id="firstname" defaultValue={userData[0].firstName} required />
        </label>
        <label htmlFor="lastname">
          Last name
          <input type="text" id="lastname" defaultValue={userData[0].lastName} required />
        </label>
        <label htmlFor="street">
          Street
          <input type="text" id="street" defaultValue={userData[0].street} required />
        </label>
        <label htmlFor="postal_code">
          Postal Code
          <input type="text" id="postal_code" defaultValue={userData[0].postalCode} required />
        </label>
        <label htmlFor="city">
          City
          <input type="text" id="city" defaultValue={userData[0].city} required />
        </label>
        <label htmlFor="save">
          Save the address for future orders
          <input type="checkbox" id="save" defaultChecked="true" />
        </label>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
      {fail && <p>{fail}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CheckoutForm;
