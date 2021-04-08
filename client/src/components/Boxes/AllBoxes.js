/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GeneralContext } from '../../context/General';

const AllBoxes = () => {
  const { allBoxes, setOrder } = useContext(GeneralContext);
  const history = useHistory();
  const [toggle, setToggle] = useState([true, true, true]);

  if (!allBoxes || allBoxes.length === 0) {
    return null;
  }

  const weekNo = dt => {
    const tdt = new Date(dt.valueOf());
    const dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      // eslint-disable-next-line no-mixed-operators
      tdt.setMonth(0, (1 + ((4 - tdt.getDay()) + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  };

  const dt = new Date();
  const weekNum = weekNo(dt);

  const handleSubmit = e => {
    e.preventDefault();
    const selectedPriceId = e.target[0].value;
    const selectedBox = e.target[1].value;
    setOrder([selectedBox, selectedPriceId]);
    history.push('/checkout');
  };
  console.log(toggle);
  const boxes = allBoxes?.map((item, index) => (
    <article key={item._id} className="box" id={item.name}>
      <div className="box-container">
        <div className="box__info">
          <div className="box__info__columnn box__img__container">
            <img className="box__img img" src={item.img} alt="food" />
          </div>
          <div className="box__info__columnn">
            <h3 className="box__name">{item.name}</h3>
            <p className="box__desc">{item.description}</p>
            <form className="box__price" onSubmit={e => handleSubmit(e)}>
              <div className="box-toggle-container">
                <label className="box-toggle-btn" htmlFor={item._id}>
                  <input type="checkbox" className="box-toggle" id={item._id} value={toggle[index] ? item.boxPrice.peopleTwo.priceId : item.boxPrice.peopleFour.priceId} onChange={() => setToggle(toggle.map((t, i) => (i === index ? !t : t)))} />
                  <span className="box-toggle-slider">
                    2 people
                    {'\u00a0\u00a0\u00a0\u00a0'}
                    4 people
                  </span>
                </label>
              </div>
              <p>
                Vegeterian box with 3 meals for
                {' '}
                {toggle[index] ? item.boxPrice.peopleTwo.people : item.boxPrice.peopleFour.people}
                {' '}
                people
              </p>
              <p className="box-kr">
                {toggle[index] ? item.boxPrice.peopleTwo.price : item.boxPrice.peopleFour.price}
                {' '}
                kr
              </p>
              <button className="btn box__btn btn-green" type="submit" value={item._id}>
                Order
              </button>
            </form>
          </div>
        </div>
        <hr />
      </div>
      <div className="box__menu">
        <h3 className="box__menu__title">
          Week
          {' '}
          {weekNum}
          {' '}
          menu
        </h3>
        <div className="box__menu__recipe card-container">
          <div className="recipe column-three menu-card menu-risotto">
            <div className="recipe-content">
              <h4 className="recipe__day">
                {'\u00a0\u00a0'}
                Day 1
                {'\u00a0\u00a0'}
              </h4>
              <div className="recipe-content-txt">
                <p className="recipe__name">{item.menu.nextWeek.recipes.recipeOne.name}</p>
                <p className="recipe__ingredients">{item.menu.nextWeek.recipes.recipeOne.ingredients.join(', ')}</p>
              </div>
            </div>
          </div>
          <div className="recipe column-three menu-card menu-pastry">
            <div className="recipe-content">
              <h4 className="recipe__day">
                {'\u00a0\u00a0'}
                Day 2
                {'\u00a0\u00a0'}
              </h4>
              <div className="recipe-content-txt">
                <p className="recipe__name">{item.menu.nextWeek.recipes.recipeTwo.name}</p>
                <p className="recipe__ingredients">{item.menu.nextWeek.recipes.recipeTwo.ingredients.join(', ')}</p>
              </div>
            </div>
          </div>
          <div className="recipe column-three menu-card menu-melon">
            <div className="recipe-content">
              <h4 className="recipe__day">
                {'\u00a0\u00a0'}
                Day 3
                {'\u00a0\u00a0'}
              </h4>
              <div className="recipe-content-txt">
                <p className="recipe__name">{item.menu.nextWeek.recipes.recipeThree.name}</p>
                <p className="recipe__ingredients">{item.menu.nextWeek.recipes.recipeThree.ingredients.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  ));

  return (
    <div className="boxes__container">
      {boxes}
    </div>
  );
};

export default AllBoxes;
