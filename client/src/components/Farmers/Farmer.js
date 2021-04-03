/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { GeneralContext } from '../../context/General';

const Farmer = () => {
  const farmerId = window.location.pathname.replace('/farmer/', '');
  const { allFarmers } = useContext(GeneralContext);
  if (!allFarmers) {
    return null;
  }
  const farmer = allFarmers.filter(e => e._id === farmerId);

  return (
    <article key={farmer[0]._id} className="box">
      <p className="farmer__name">
        Name:
        {' '}
        {farmer[0].name}
      </p>
      <p className="farmer__desc">
        Description:
        {' '}
        {farmer[0].description}
      </p>
      <p className="farmer__type">
        Type:
        {' '}
        {farmer[0].type}
      </p>
      <p className="farmer__type">
        Host Type:
        {' '}
        {farmer[0].hostType}
      </p>

      <p className="farmer__area">
        Property Area:
        {' '}
        {farmer[0].propertyArea}
      </p>
      <p className="farmer__methodologies">
        Methodologies:
        {' '}
        {farmer[0].methodologies}
      </p>
      <p className="farmer__products">
        Products:
        {' '}
        {farmer[0].products}
      </p>
      <p className="farmer__practices">
        Practices:
        {' '}
        {farmer[0].practices}
      </p>
      <p className="farmer__animals">
        Animals:
        {' '}
        {farmer[0].animals}
      </p>
      <p className="farmer__credits">
        <a href={farmer[0].credits} target="_blank" rel="noreferrer">Credits</a>
      </p>
    </article>
  );
};

export default Farmer;
