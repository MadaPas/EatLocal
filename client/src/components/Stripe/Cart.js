/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GeneralContext } from '../../context/General';

const Cart = () => {
  const history = useHistory();
  const {
    allBoxes, order, setOrder,
  } = useContext(GeneralContext);

  if (order === null || order.length === 0 || !allBoxes) {
    return (
      <div className="cart">
        <h1 className="cart__title">Cart</h1>
        <p className="cart__txt">Your cart is empty.</p>
        <button className="btn box__btn btn--shop" type="button" value="/boxes" onClick={e => history.push(e.target.value)}>See Boxes</button>
      </div>
    );
  }
  const box = allBoxes.filter(b => b._id === order[0]);
  const boxOption = box[0].boxPrice.peopleFour.priceId === order[1] ? box[0].boxPrice.peopleFour : box[0].boxPrice.peopleTwo;

  return (
    <div key={box[0]._id} className="cart">
      <h1 className="cart__title">Order Summary</h1>
      <div className="cart__cont">
        <div className="cart__order-summary">
          <div>
            <h4 className="cart__txt">Subscription:</h4>
            <div className="summary__card summary__card__cart">
              <div className="summary__card__column">
                <img className="summary__card__img img" src={box[0].img} alt="food" />
              </div>
              <div className="summary__card__column summary-description">
                <p className="box__name box__name__incart">
                  {box[0].name}
                  {' '}
                  box
                </p>
                <p className="box__type">
                  {box[0].type}
                </p>
                <p className="box__people">
                  For
                  {' '}
                  {boxOption.people}
                  {' '}
                  people
                </p>
                <p className="box__text">
                  Delivery every Sunday.
                </p>
                <p className="box__price">
                  {boxOption.price}
                  {' '}
                  SEK
                </p>
              </div>
            </div>
          </div>
          <div className="btn-remove__container">
            <button className="btn box__btn btn--remove" type="button" onClick={() => setOrder([])}>x</button>
          </div>
        </div>
      </div>
      <div className="btn-checkout__container">
        <button className="btn box__btn btn--checkout" type="button" value="/checkout" onClick={e => history.push(e.target.value)}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
