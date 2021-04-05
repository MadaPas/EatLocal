/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { GeneralContext } from '../../context/General';

const Map = props => {
  const { farmersPage } = props;
  const history = useHistory();
  const [viewport, setViewport] = useState({
    latitude: 62.5757168,
    longitude: 11.3908554,
    width: '100vw',
    height: '100vh',
    zoom: 5,
  });
  const [selectedFarm, setSelectedFarm] = useState(null);

  const { allFarmers } = useContext(GeneralContext);

  const [selectedFarm, setSelectedFarm] = useState(allFarmers ? allFarmers.filter(f => f._id === window.location.pathname.replace('/farmers/', '')) : null);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') setSelectedFarm(null);
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  console.log(process.env.REACT_APP_MAPBOX_TOKEN, 'Map key');

  return (
    <>
      <section className="section map">
      <ReactMapGL
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        width={viewport.width}
        height={viewport.height}
        zoom={viewport.zoom}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/kemppi83/ckn4obm5f1ygk17mlc1pdlwuc'
        onViewportChange={v => setViewport(v)}
      >
        {allFarmers && allFarmers.map(farm => (
          <Marker key={farm._id} latitude={farm.lat} longitude={farm.lon}>
            <button
              className="marker"
              type="button"
              onClick={() => {
                  setSelectedFarm([farm]);
                }}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </button>
            </Marker>
          ))}
          {selectedFarm && selectedFarm.length > 0 && (
          <Popup
            className="map__popup"
            latitude={selectedFarm[0].lat}
            longitude={selectedFarm[0].lon}
            closeButton={false}
          >
            <button className="map__popup_close btn" type="button" onClick={() => setSelectedFarm(null)}>x</button>
            <p className="map__popup__title">
              {selectedFarm[0].name}
            </p>
            {!farmersPage && (<button className="map__popup_btn btn" type="button" onClick={() => history.push(`/farmers/${selectedFarm[0]._id}`)}>See More</button>)}
          </Popup>
          )}
        </ReactMapGL>
      </section>
      <div>
        {farmersPage && selectedFarm && (
        <section className="section farmers">
          <p className="farmers__name">{selectedFarm[0].name}</p>
          <p className="farmers__address">{selectedFarm[0].address}</p>
          <p className="farmers__desc">{selectedFarm[0].description}</p>
          <p className="farmers__organic">
            Organic:
            {selectedFarm.organic}
          </p>
          <p>
            Type:
            {selectedFarm.type}
          </p>
          <p>
            Property Type:
            {selectedFarm.propertyArea}
          </p>
          <p>
            Practices:
            {selectedFarm.practices}
          </p>
          <p>
            Animals:
            {selectedFarm.animals}
          </p>
          <p>
            Products:
            {selectedFarm.products}
          </p>
          <p>
            Link:
            {selectedFarm.credits}
          </p>
        </div>
      )}
    </>
  );
};

export default Map;

Map.defaultProps = {
  farmersPage: true,
};

Map.propTypes = {
  farmersPage: PropTypes.bool,
};
