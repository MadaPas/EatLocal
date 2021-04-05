/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useContext } from 'react';

import { GeneralContext } from '../../context/General';

const Cart = () => {
  const {
    allBoxes, order, setOrder,
  } = useContext(GeneralContext);
  console.log(order, 'ORDER');
  if (order === null || order.length === 0 || !allBoxes) {
    return <a href="/boxes">View boxes</a>;
  }
  const box = allBoxes.filter(b => b._id === order[0]);
  const boxOption = box[0].boxPrice.peopleFour.priceId === order[1] ? box[0].boxPrice.peopleFour : box[0].boxPrice.peopleTwo;

  const handleSubmit = async e => {
    e.preventDefault();
    setOrder([]);
  };

  return (
    <div key={box[0]._id} className="box">
      <h1>Cart</h1>
      <p>Your cart contains:</p>
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
      <button type="button" onClick={e => handleSubmit(e)}>Remove</button>
      <a href="/checkout">Checkout</a>
    </div>
  );
};

export default Cart;
