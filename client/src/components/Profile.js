/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/General';

import vegetarianImg from '../images/boxes/vegetarian.jpg';
import veganImg from '../images/boxes/vegan.jpg';
import familyImg from '../images/boxes/family.jpg';

const Profile = () => {
  const {
    userData, loggedIn, setUserData, orderHistory, allBoxes,
  } = useContext(GeneralContext);
  const [editing, setEditing] = useState(false);

  if (!userData || userData.length === 0) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }
  const imgArray = [vegetarianImg, familyImg, veganImg];

  const now = new Date();
  const dateOffset = now.getDay() > 4 ? ((7 - now.getDay()) % 7) + 7 : ((7 - now.getDay()) % 7);
  const result = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dateOffset,
  ).toLocaleDateString('en-GB');
  if (result < now) result.setDate(result.getDate() + 7);

  let historyHtml = null;
  if (orderHistory.length > 0) {
    historyHtml = orderHistory.map(o => {
      const box = allBoxes.filter(b => b._id === o.boxId);
      const imagePath = imgArray.filter(i => i.search(box[0].img) !== -1);
      return (
        <div className="summary__card">
          <div className="summary__card__column">
            <img className="summary__card__img img" src={imagePath} alt="food" />
          </div>
          <div className="summary__card__column">
            <p className="box__name">
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
              {o.people}
              {' '}
              people
            </p>
            <p className="box__text">
              Order placed on
              {' '}
              {o.date}
              .
            </p>
            <p className="box__text">
              Next delivery on
              {' '}
              {result}
              .
            </p>
            <p className="box__price profile__box__price">
              {o.price}
              {' '}
              SEK
            </p>
            <p className="box__status">Active</p>
          </div>
        </div>
      );
    });
  }

  const handleEdit = async e => {
    e.preventDefault();
    if (editing) {
      const street = userData[0].street !== e.target[0].value;
      const postalCode = `${userData[0].postalCode}` !== e.target[1].value;
      const city = userData[0].city !== e.target[2].value;
      if (street || postalCode || city) {
        const updateFields = {
          oktaId: loggedIn.accessToken.claims.uid,
          street: e.target[0].value,
          postalCode: e.target[1].value,
          city: e.target[2].value,
        };
        const updateResponse = await fetch('https://server-eatlocal-m4j.herokuapp.com/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
          },
          method: 'PUT',
          body: JSON.stringify(updateFields),
        });
        const updatedUser = await updateResponse.json();
        setUserData([updatedUser]);
      }
    }
    setEditing(!editing);
  };

  return (
    <div className="section profile">
      <div className="profile__column">
        <h2 className="user__profile__title">Personal info</h2>
        <div className="user__cont">
          <div className="firstname">
            <p className="user__label">First name</p>
            <p className="profile__firstname profile__field">
              {userData[0].firstName}
            </p>
          </div>

          <div className="lastname">
            <p className="user__label">Last name</p>
            <p className="profile__lastname profile__field">
              {userData[0].lastName}
            </p>
          </div>

          <div className="email">
            <p className="user__label">Email</p>
            <p className="profile__email profile__field">
              {userData[0].email}
            </p>
          </div>

          <div className="address">
            <p className="user__label user__label__ad">Address:</p>
          </div>
          <form className="profile__form form" onSubmit={e => handleEdit(e)}>
            <label className="form__label street" htmlFor="street">
              <p className="user__label user__label__address">Street</p>
              {editing ? (
                <input className="form__field__user form__input street" type="text" id="street" defaultValue={userData[0].street} required />
              ) : <p className="profile__street profile__field__address" id="street">{userData[0].street}</p>}
            </label>
            <label className="form__label postal_code" htmlFor="postal_code">
              <p className="user__label user__label__address">Postal</p>
              {editing ? (
                <input className="form__field__user form__input postal_code" type="text" id="postal_code" defaultValue={userData[0].postalCode} required />
              ) : <p className="profile__postal_code profile__field__address" id="postal_code">{userData[0].postalCode}</p>}
            </label>
            <label className="form__label city" htmlFor="city">
              <p className="user__label user__label__address">City</p>
              {editing ? (
                <input className="form__field__user form__input city" type="text" id="city" defaultValue={userData[0].city} required />
              ) : <p className="profile__city profile__field__address" id="city">{userData[0].city}</p>}
            </label>
            <button className="form__btn profile__btn btn btn--green" type="submit">Edit address</button>
          </form>
        </div>
      </div>
      <div className="profile__column">
        <h2 className="user__profile__title">Order history</h2>
        {historyHtml}
      </div>
    </div>
  );
};

export default Profile;
