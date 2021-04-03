/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { GeneralContext } from '../context/General';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const {
    allBoxes, order, setOrder, loggedIn, userData, setUserData,
  } = useContext(GeneralContext);
  console.log(setOrder);
  if (!order || order.length === 0) {
    // window.location = '/';
    return null;
  }
  if (!allBoxes || !userData || userData.length === 0) {
    return null;
  }

  const box = allBoxes.filter(b => b._id === order[0]);
  const boxOption = box[0].boxPrice.peopleFour.priceId === order[1] ? box[0].boxPrice.peopleFour : box[0].boxPrice.peopleTwo;

  const handleSubmit = async e => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error && userData) {
      try {
        let updatedUser;
        const { id } = paymentMethod;
        if (!userData[0].stripeId) {
          const response = await fetch('http://localhost:8001/api/create-customer', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify({
              email: userData[0].email,
              pm: id,
            }),
          });
          const customer = await response.json();

          const updateUser = {
            oktaId: loggedIn.accessToken.claims.uid,
            stripeId: customer.id,
          };
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
          updatedUser = await updateUserResponse.json();
          setUserData([updatedUser]);
        }

        const createSubscription = await fetch('http://localhost:8001/api/create-subscription', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
          },
          body: JSON.stringify({
            customerId: userData[0].stripeId || updatedUser.stripeId,
            paymentMethodId: id,
            priceId: order[1],
          }),
        });
        if (!createSubscription.ok) {
          throw Error(createSubscription.statusText);
        }

        const subscription = await createSubscription.json();

        const userInput = {
          orderId: uuidv4(),
          oktaId: loggedIn.accessToken.claims.uid,
          stripeId: userData[0].stripeId || updatedUser.stripeId,
          subscriptionId: subscription.id,
          firstName: e.target[0].value,
          lastName: e.target[1].value,
          street: e.target[2].value,
          postalCode: e.target[3].value,
          city: e.target[4].value,
          boxId: order[0],
          people: boxOption.people,
          price: boxOption.price,
          priceId: boxOption.priceId,
          date: new Date().toISOString().slice(0, 10),
        };
        const checkoutResponse = await fetch('http://localhost:8001/api/orders', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
          },
          method: 'POST',
          body: JSON.stringify(userInput),
        });
        const checkout = await checkoutResponse.json();
        if (checkout) {
          history.push('/success');
          setOrder([]);
        }
        // } catch (err) {
        //   console.log(err);
        //   history.push('/fail');
        // }
      } catch (err) {
        history.push('/fail');
      }
    } else if (error) {
      history.push('/fail');
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
    </div>
  );
};

export default CheckoutForm;
