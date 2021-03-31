/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';

import { GeneralContext } from '../context/General';

const Box = () => {
  const boxId = window.location.pathname.replace('/box/', '');
  // const { boxId } = useParams();
  const { allBoxes } = useContext(GeneralContext);
  if (!allBoxes) {
    return null;
  }
  const box = allBoxes.filter(e => e._id === boxId);

  return (
    <article key={box[0]._id} className="box">
      <img src={box[0].img} alt="place holder" />
      <p className="box__name">{box[0].name}</p>
      <p className="box__type">{box[0].type}</p>
      <p className="box__desc">{box[0].description}</p>
      <div className="box__price">
        <p className="box__price_two">
          2 people:
          {box[0].price.peopleTwo}
        </p>
        <p className="box__price_four">
          4 people:
          {box[0].price.peopleFour}
        </p>
      </div>
      <div className="box__menus">
        <div className="box__menu">
          <p className="menu__week">
            Next week:
            {box[0].menu.nextWeek.weekNumber}
          </p>
          <div className="menu__recipes">
            <div className="recipe__one">
              <p className="recipe__name">{box[0].menu.nextWeek.recipes.recipeOne.name}</p>
              <ul className="recipe__ingredients">{box[0].menu.nextWeek.recipes.recipeOne.ingredients.map(i => (<li>{i}</li>))}</ul>
            </div>
          </div>
        </div>
        <div className="box__menu">
          <p className="menu__week">
            Week after:
            {box[0].menu.weekAfter.weekNumber}
          </p>
          <div className="menu__recipes">
            <div className="recipe__one">
              <p className="recipe__name">{box[0].menu.weekAfter.recipes.recipeOne.name}</p>
              <ul className="recipe__ingredients">{box[0].menu.weekAfter.recipes.recipeOne.ingredients.map(i => (<li>{i}</li>))}</ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Box;
