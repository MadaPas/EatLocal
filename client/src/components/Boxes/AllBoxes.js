/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GeneralContext } from '../../context/General';

const AllBoxes = () => {
  const { allBoxes, setOrder } = useContext(GeneralContext);
  const history = useHistory();
  const [toggle, setToggle] = useState(true);

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

  const boxes = allBoxes?.map(item => (
    <article key={item._id} className="box" id={item.name}>
      <div className="box__info">
        <div className="box__info__columnn">
          <img className="box__img img" src={item.img} alt="place holder" />
        </div>
        <div className="box__info__columnn">
          <h2 className="box__name">{item.name}</h2>
          <p className="box__desc">{item.description}</p>
          <form className="box__price" onSubmit={e => handleSubmit(e)}>
            <label className="box__input" htmlFor="box--toggle">
              <input type="checkbox" className="box--toggle" id="box--toggle" value={toggle ? item.boxPrice.peopleTwo.priceId : item.boxPrice.peopleFour.priceId} onChange={() => setToggle(!toggle)} />
            </label>
            <p>
              Vegeterian box with 3 meals for
              {' '}
              {toggle ? item.boxPrice.peopleTwo.people : item.boxPrice.peopleFour.people}
              {' '}
              people
            </p>
            <p>
              {toggle ? item.boxPrice.peopleTwo.price : item.boxPrice.peopleFour.price}
              {' '}
              kr
            </p>
            <button className="btn box__btn btn--white" type="submit" value={item._id}>
              Order
            </button>
          </form>
        </div>
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
          <div className="recipe column-three">
            <div className="recipe__content">
              <h4 className="recipe__day">Day 1</h4>
              <p className="recipe__name">{item.menu.nextWeek.recipes.recipeOne.name}</p>
              <p className="recipe__ingredients">{item.menu.nextWeek.recipes.recipeOne.ingredients.map((i, index) => (<li key={index}>{i}</li>))}</p>
            </div>
          </div>
          <div className="recipe column-three">
            <div className="recipe__content">
              <h4 className="recipe__day">Day 2</h4>
              <p className="recipe__name">{item.menu.nextWeek.recipes.recipeTwo.name}</p>
              <p className="recipe__ingredients">{item.menu.nextWeek.recipes.recipeTwo.ingredients.map((i, index) => (<li key={index}>{i}</li>))}</p>
            </div>
          </div>
          <div className="recipe column-three">
            <div className="recipe__content">
              <h4 className="recipe__day">Day 3</h4>
              <p className="recipe__name">{item.menu.nextWeek.recipes.recipeThree.name}</p>
              <p className="recipe__ingredients">{item.menu.nextWeek.recipes.recipeThree.ingredients.map((i, index) => (<li key={index}>{i}</li>))}</p>
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
