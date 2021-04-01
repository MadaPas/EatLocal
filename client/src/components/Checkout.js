/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

import { GeneralContext } from '../context/General';

const Checkout = () => {
  const history = useHistory();
  const {
    allBoxes, order, setOrder, loggedIn, userData, setUserData,
  } = useContext(GeneralContext);

  if (!allBoxes || !order || !userData || order.length === 0 || userData.length === 0) {
    window.location = '/';
    return null;
  }
  const box = allBoxes.filter(b => b._id === order[0]);
  const price = order[1] === '2' ? box[0].price.peopleTwo : box[0].price.peopleFour;

  const handleSubmit = async e => {
    e.preventDefault();
    const userInput = {
      orderId: uuidv4(),
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
      console.log(e.target[4].value);
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
        setOrder(null);
      }
      if (e.target[5].value) {
        const updateFields = {
          oktaId: loggedIn.accessToken.claims.uid,
          street: e.target[2].value,
          postalCode: e.target[3].value,
          city: e.target[4].value,
        };
        const updateResponse = await fetch('http://localhost:8001/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
          },
          method: 'PUT',
          body: JSON.stringify(updateFields),
        });
        const updatedUser = await updateResponse.json();
        setUserData(updatedUser);
        console.log(updatedUser, 'updated user');
      }
    } catch (error) {
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
        {order[1]}
      </p>
      <p>
        {price}
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
        <label htmlFor="address">
          Address
          <input type="text" id="address" defaultValue={userData[0].street} required />
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
        <button type="submit">Place an order</button>
      </form>
    </div>
  );
};

export default Checkout;
