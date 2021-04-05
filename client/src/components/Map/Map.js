/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from 'react-router-dom';

import { GeneralContext } from '../../context/General';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 62.5757168,
    longitude: 11.3908554,
    width: '100vw',
    height: '100vh',
    zoom: 5,
  });
  const [selectedFarm, setSelectedFarm] = useState(null);

  const { allFarmers } = useContext(GeneralContext);

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
                setSelectedFarm(farm);
              }}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </button>
          </Marker>
        ))}
        {selectedFarm && (
        <Popup
          latitude={selectedFarm.lat}
          longitude={selectedFarm.lon}
          onClose={() => setSelectedFarm(null)}
        >
          <div>
            {selectedFarm.name}
          </div>
        </Popup>
        )}
      </ReactMapGL>
      {selectedFarm && (
        <div>
          <p>{selectedFarm.name}</p>
          <p>{selectedFarm.address}</p>
          <p>{selectedFarm.description}</p>
          <p>
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
