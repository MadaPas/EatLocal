/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GeneralContext } from '../../context/General';

const AllFarmers = () => {
  const { allFarmers } = useContext(GeneralContext);
  const history = useHistory();
  const buttonHandler = value => {
    history.push(`/farmer/${value}`);
  };

  const farmers = allFarmers?.map(item => (
    <article key={item._id} className="farmer">
      <p className="farmer__name">
        Name:
        {' '}
        {item.name}
      </p>
      <p className="farmer__address">
        Address:
        {' '}
        {item.address}
      </p>
      <p className="farmer__type">
        Type:
        {' '}
        {item.type}
      </p>
      <p className="farmer__type">
        Host Type:
        {' '}
        {item.hostType}
      </p>

      <p className="farmer__area">
        Property Area:
        {' '}
        {item.propertyArea}
      </p>
      <p className="farmer__products">
        Products:
        {' '}
        {item.products}
      </p>

      <button type="button" value={item._id} onClick={e => buttonHandler(e.target.value)}>
        Discover more about this farm
      </button>
    </article>
  ));

  return (
    <div>
      {!allFarmers || allFarmers.length === 0 ? (
        null
      ) : (
        <div>
          {farmers}
        </div>
      )}
    </div>
  );
};

export default AllFarmers;
