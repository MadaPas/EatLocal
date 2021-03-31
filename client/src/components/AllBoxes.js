/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { GeneralContext } from '../context/General';

const AllBoxes = props => {
  const { setBox } = props;
  const { allBoxes } = useContext(GeneralContext);

  const buttonHandler = value => setBox(value);

  const boxes = allBoxes?.map(item => {
    console.log(item.img);
    return (
      <article key={item._id} className="box">
        <img src={item.img} alt="place holder" />
        <p className="box__name">{item.name}</p>
        <p className="box__type">{item.type}</p>
        <p className="box__desc">{item.description}</p>
        <div className="box__price">
          <p className="box__price_two">
            2 people:
            {item.price.peopleTwo}
          </p>
          <p className="box__price_four">
            4 people:
            {item.price.peopleFour}
          </p>
        </div>
        <div className="box__menus">
          <div className="box__menu">
            <p className="menu__week">
              Next week:
              {item.menu.nextWeek.weekNumber}
            </p>
            <div className="menu__recipes">
              <div className="recipe__one">
                <p className="recipe__name">{item.menu.nextWeek.recipes.recipeOne.name}</p>
                <ul className="recipe__ingredients">{item.menu.nextWeek.recipes.recipeOne.ingredients.map(i => (<li>{i}</li>))}</ul>
              </div>
            </div>
          </div>
          <div className="box__menu">
            <p className="menu__week">
              Week after:
              {item.menu.weekAfter.weekNumber}
            </p>
            <div className="menu__recipes">
              <div className="recipe__one">
                <p className="recipe__name">{item.menu.weekAfter.recipes.recipeOne.name}</p>
                <ul className="recipe__ingredients">{item.menu.weekAfter.recipes.recipeOne.ingredients.map(i => (<li>{i}</li>))}</ul>
              </div>
            </div>
          </div>
        </div>
        <button type="button" value={item._id} onClick={e => buttonHandler(e.target.value)}>
          VIEW
        </button>
      </article>
    );
  });

  return (
    <div>
      {!allBoxes || allBoxes.length === 0 ? (
        null
      ) : (
        <div>
          {boxes}
        </div>
      )}
    </div>
  );
};

AllBoxes.propTypes = {
  setBox: PropTypes.string.isRequired,
};

export default AllBoxes;
