/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/General';

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
  let historyHtml = null;
  if (orderHistory.length > 0) {
    historyHtml = orderHistory.map(o => {
      const box = allBoxes.filter(b => b._id === o.boxId);
      return (
        <article>
          <p>{o.date}</p>
          <img src={box[0].img} alt="place holder" />
          <p>{box[0].name}</p>
          <p>{box[0].type}</p>
          <p>{o.price}</p>
          <p>
            For
            {' '}
            {o.people}
            {' '}
            people
          </p>
        </article>
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
        const updateResponse = await fetch('http://localhost:8001/api/users', {
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
    <div>
      <p>
        First name:
        {userData[0].firstName}
      </p>
      <p>
        Last name:
        {userData[0].lastName}
      </p>
      <p>
        Email:
        {userData[0].email}
      </p>
      <form onSubmit={e => handleEdit(e)}>
        <label htmlFor="street">
          Street
          {editing ? (
            <input type="text" id="street" defaultValue={userData[0].street} required />
          ) : <p id="street">{userData[0].street}</p>}
        </label>
        <label htmlFor="postal_code">
          Postal code
          {editing ? (
            <input type="text" id="postal_code" defaultValue={userData[0].postalCode} required />
          ) : <p id="postal_code">{userData[0].postalCode}</p>}
        </label>
        <label htmlFor="city">
          City
          {editing ? (
            <input type="text" id="city" defaultValue={userData[0].city} required />
          ) : <p id="city">{userData[0].city}</p>}
        </label>
        <button type="submit">Edit address</button>
      </form>
      {historyHtml}
    </div>
  );
};

export default Profile;
