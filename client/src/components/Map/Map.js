/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';

import { GeneralContext } from '../../context/General';

const Map = props => {
  const { farmersPage } = props;
  const history = useHistory();
  const [viewport, setViewport] = useState({
    latitude: 57.7826,
    longitude: 14.1618,
    width: '100%',
    height: '50vh',
    zoom: 4,
  });
  const { allFarmers } = useContext(GeneralContext);
  const myRef = useRef(null);
  const [selectedFarm, setSelectedFarm] = useState(allFarmers ? allFarmers.filter(f => f._id === window.location.pathname.replace('/farmers/', '')) : null);

  const scrollHandler = f => {
    setSelectedFarm([f]);
  };

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') setSelectedFarm(null);
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  useEffect(() => {
    if (!farmersPage) {
      document.getElementById('map').classList.add('landing__map');
      return () => {
        document.getElementById('map').classList.remove('landing__map');
      };
    }
    return null;
  }, []);

  return (
    <>
      <section className="section map" id="map">
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
                className="map__marker"
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
        {farmersPage && selectedFarm && selectedFarm.length > 0 && (
          <>
            <section ref={myRef} className="section farmers">
              <div className="farm-container-name">
                <div className="farm__content">
                  <p className="farmers__name">{selectedFarm[0].name}</p>
                  <p className="farmers__address">{selectedFarm[0].address}</p>
                  {selectedFarm[0].organic && (
                    <p className="farmers__organic">
                      Organic
                      <FontAwesomeIcon icon={faLeaf} />
                    </p>
                  )}
                </div>
              </div>
              <div className="farm-info">
                <p className="farmers__type">
                  Type:
                  {selectedFarm[0].type}
                </p>
                <p className="farmers__area">
                  Area:
                  {selectedFarm[0].propertyArea}
                </p>
                <p className="farmers__practices">
                  Practices:
                  {selectedFarm[0].practices}
                </p>
                <p className="farmers__animals">
                  Animals:
                  {selectedFarm[0].animals}
                </p>
                <p className="farmers__products">
                  Products:
                  {selectedFarm[0].products}
                </p>
                <p className="farmers__desc">{selectedFarm[0].description}</p>
                <p className="farmers__credits">
                  Link:
                  {selectedFarm[0].credits}
                </p>
              </div>
            </section>
          </>
        )}
        {farmersPage && (
          <section className="section farmer__cards card-container">
            {allFarmers?.map(f => (
              <div className="farmer__card column-three" id={f.name.split(' ')[0]}>
                <div className="farmer__content card__content" onClick={() => scrollHandler()}>
                  <p className="card__name">{f.name}</p>
                  <p className="card__address">{f.address}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
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
