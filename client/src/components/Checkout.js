/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useContext } from 'react';

import { GeneralContext } from '../context/General';

const Checkout = () => {
  const {
    allBoxes, order, loggedIn,
  } = useContext(GeneralContext);
  if (!allBoxes) {
    return null;
  }
  const box = allBoxes.filter(b => b._id === order[0]);
  const price = order[1] === '2' ? box[0].price.peopleTwo : box[0].price.peopleFour;

  const handleSubmit = async e => {
    e.preventDefault();
    const userInput = {
      oktaId: loggedIn.accessToken.claims.uid,
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      street: e.target[2].value,
      postalCode: e.target[3].value,
      city: e.target[4].value,
      boxId: order[0],
      people: order[1],
      price,
    };
    try {
      const checkoutResponse = await fetch('http://localhost:8001/api/orders', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify(userInput),
      });
      const checkout = await checkoutResponse.json();
      console.log(checkout);
    } catch (error) {
      console.log(error);
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
        {order[1]}
      </p>
      <p>
        {price}
      </p>
      <p>You will enjoy your box on Sunday. (Calculate date based on order date)</p>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="firstname">
          First name
          <input type="text" id="firstname" />
        </label>
        <label htmlFor="lastname">
          Last name
          <input type="text" id="lastname" />
        </label>
        <label htmlFor="address">
          Address
          <input type="text" id="address" />
        </label>
        <label htmlFor="postal_code">
          Postal Code
          <input type="text" id="postal_code" />
        </label>
        <label htmlFor="city">
          City
          <input type="text" id="city" />
        </label>
        <button type="submit">Place an order</button>
      </form>
    </div>
  );
};

export default Checkout;
