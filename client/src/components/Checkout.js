/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useContext } from 'react';

import { GeneralContext } from '../context/General';

const Checkout = () => {
  const { allBoxes, order } = useContext(GeneralContext);
  if (!allBoxes) {
    return null;
  }
  const box = allBoxes.filter(b => b._id === order[0]);
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
        {order[1] === 2 ? box[0].price.peopleTwo : box[0].price.peopleFour}
      </p>
    </div>
  );
};

export default Checkout;
