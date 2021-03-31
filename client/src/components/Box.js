/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GeneralContext } from '../context/General';

const Box = () => {
  const history = useHistory();
  const boxId = window.location.pathname.replace('/box/', '');
  // const { boxId } = useParams();
  const { allBoxes, setOrder } = useContext(GeneralContext);
  if (!allBoxes) {
    return null;
  }
  const box = allBoxes.filter(e => e._id === boxId);
  const handleSubmit = e => {
    e.preventDefault();
    const selectedSize = e.target[0].checked ? e.target[0].value : e.target[1].value;
    const selectedBox = e.target[2].value;
    setOrder([selectedBox, selectedSize]);
    history.push('/checkout');
  };
  return (
    <article key={box[0]._id} className="box">
      <img src={box[0].img} alt="place holder" />
      <p className="box__name">{box[0].name}</p>
      <p className="box__type">{box[0].type}</p>
      <p className="box__desc">{box[0].description}</p>
      <form className="box__price" onSubmit={(e => handleSubmit(e))}>
        <label>
          <input className="box__price_two" value="2" type="radio" name="price" checked="true" />
          {' '}
          2 people:
          {box[0].price.peopleTwo}
        </label>
        <label>
          <input className="box__price_four" value="4" type="radio" name="price" />
          {' '}
          4 people:
          {box[0].price.peopleFour}
        </label>
        <button type='submit' value={box[0]._id}>Checkout</button>
      </form>
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
