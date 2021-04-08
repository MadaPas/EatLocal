/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { GeneralContext } from '../../context/General';

const CheckoutForm = () => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [fail, setFail] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();
  const {
    allBoxes, order, setOrder, loggedIn, userData, setUserData,
  } = useContext(GeneralContext);
  console.log(order, 'order');
  const now = new Date();
  const dateOffset = now.getDay() > 4 ? ((7 - now.getDay()) % 7) + 7 : ((7 - now.getDay()) % 7);
  const dateResult = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dateOffset,
  ).toLocaleDateString('en-GB');
  if (dateResult < now) dateResult.setDate(dateResult.getDate() + 7);

  const removeHandler = () => {
    setOrder([]);
    history.push('/boxes');
  };
  if (success) {
    console.log(success);
    return (
      <div className="checkout__success checkout">
        <p className="success__txt">Your payment was successful</p>
        <div className="summary__card">
          <div className="summary__card__column">
            <img className="summary__card__img img" src={success[0]} alt="food" />
          </div>
          <div className="summary__card__column">
            <p className="box__name">
              {success[1]}
              {' '}
              box
            </p>
            <p className="box__people">
              For
              {' '}
              {success[3]}
              {' '}
              people
            </p>
            <p className="box__text">
              Delivery every Sunday, await your box on
              {' '}
              {dateResult}
              . Recipes will be in the box.
            </p>
            <p className="box__price">
              {success[4]}
              {' '}
              SEK
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!order || order.length === 0) {
    return null;
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
    <div key={box[0]._id} className="checkout">
      <div className="checkout__summary">
        <h1 className="summary__title">Order Summary</h1>
        <div className="summary__card">
          <div className="summary__card__column">
            <button className="btn--remove--checkout" type="button" onClick={() => removeHandler()}>x</button>
            <img className="summary__card__img img" src={box[0].img} alt="food" />
          </div>
          <div className="summary__card__column">
            <p className="box__name">
              {box[0].name}
              {' '}
              box
            </p>
            <p className="box__people">
              For
              {' '}
              {boxOption.people}
              {' '}
              people
            </p>
            <p className="box__text">
              Delivery every Sunday
            </p>
            <p className="box__price">
              {boxOption.price}
              {' '}
              SEK
            </p>
          </div>
        </div>
        <div className="summary__table summary__order__checkout">
          <p className="table__title">Your order</p>
          <p className="table__box">
            {box[0].name}
            {' '}
            (
            {box[0].type}
            ),
            {' '}
            {boxOption.people}
            {' '}
            people
          </p>
          <table className="table__invoice">
            <tbody>
              <tr>
                <td>{box[0].name}</td>
                <td>
                  {boxOption.price}
                  .00
                  {' '}
                  SEK
                </td>
              </tr>
              <tr>
                <td>Delivery</td>
                <td>
                  0.00
                  {' '}
                  SEK
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  {boxOption.price}
                  .00
                  {' '}
                  SEK
                </td>
              </tr>
            </tbody>
          </table>
          <p className="table__txt">You can skip a week or cancel the subscription any time.</p>
          <p className="table__txt">The subscription is billed weekly.</p>
          <p className="table__txt">
            You will receive your box on Sunday,
            {' '}
            {dateResult}
            .
          </p>
        </div>
      </div>
      <div className="form__div">
        <form className="checkout__form form" onSubmit={e => handleSubmit(e)}>
          <label className="user__label form__label firstname" htmlFor="firstname">
            First name
            <input className="form__field form__input firstname" type="text" id="firstname" defaultValue={userData[0].firstName} required />
          </label>
          <label className="user__label form__label lastname" htmlFor="lastname">
            Last name
            <input className="form__field__user form__field form__input lastname" type="text" id="lastname" defaultValue={userData[0].lastName} required />
          </label>
          <label className="user__label form__label street" htmlFor="street">
            Street
            <input className="form__field form__input street" type="text" id="street" defaultValue={userData[0].street} required />
          </label>
          <label className="user__label form__label postal_code" htmlFor="postal_code">
            Postal Code
            <input className="form__field form__input postal_code" type="text" id="postal_code" defaultValue={userData[0].postalCode} required />
          </label>
          <label className="user__label form__label city" htmlFor="city">
            City
            <input className="form__field form__input city" type="text" id="city" defaultValue={userData[0].city} required />
          </label>
          <label className="form__label__save save" htmlFor="save">
            Save the address for future orders
            <input className="form__input save" type="checkbox" id="save" defaultChecked="true" />
          </label>
          <label className="form__label__terms terms" htmlFor="terms">
            I accept
            {' '}
            <a href="#">Terms and Conditions</a>
            <input className="form__input terms" type="checkbox" id="terms" required />
          </label>
          <CardElement />
          <button className="form__btn btn btn-green" type="submit">Pay</button>
        </form>
      </div>
      {fail && <p className="form__txt">{fail}</p>}
      {loading && <p className="form__txt">Loading...</p>}
    </div>
  );
};

export default CheckoutForm;
