/* eslint-disable import/no-unresolved */
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
import mapboxgl from 'mapbox-gl';
import { GeneralContext } from '../../context/General';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

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
    myRef.current.scrollIntoView();
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
      <div ref={myRef}>
        {farmersPage && selectedFarm && selectedFarm.length > 0 && (
          <>
            <section className="section farmers">
              <div className="farm-container-name">
                <div className="farm__content">
                  <h3 className="farmers__name">{selectedFarm[0].name}</h3>
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
                <div className="farmer__field__container">
                  <p className="farmer__label">
                    Type
                  </p>
                  <p className="farmer__field farmers__type">
                    {selectedFarm[0].type}
                  </p>
                </div>

                <div className="farmer__field__container">
                  <p className="farmer__label">
                    Property Area
                  </p>
                  <p className="farmer__field farmers__area">
                    {selectedFarm[0].propertyArea}
                  </p>
                </div>

                <div className="farmer__field__container">
                  <p className="farmer__label">
                    Practices
                  </p>
                  <p className="farmer__field farmers__practices">
                    {selectedFarm[0].practices}
                  </p>
                </div>

                <div className="farmer__field__container">
                  <p className="farmer__label">
                    Animals
                  </p>
                  <p className="farmer__field farmers__animals">
                    {selectedFarm[0].animals}
                  </p>
                </div>

                <div className="farmer__field__container">
                  <p className="farmer__label">
                    Products
                  </p>
                  <p className="farmer__field farmers__products">
                    {selectedFarm[0].products}
                  </p>
                </div>

                <div className="farmer__field__container">
                  <p className="farmer__label">
                    About
                  </p>
                  <p className="farmer__field farmers__desc">
                    {selectedFarm[0].description}
                  </p>
                </div>

                <div className="credit__link__container farmer__field__container">
                  <a className="credit__link btn btn-green" href={selectedFarm[0].credits} target="_blank" rel="noreferrer">
                    Learn More
                  </a>
                </div>

              </div>
            </section>
          </>
        )}
        {farmersPage && (
          <section className="section farmer__cards card-container">
            {allFarmers?.map(f => (
              <div className="farmer__card column-three" id={f.name.split(' ')[0]}>
                <div className="farmer__content card__content" onClick={() => scrollHandler(f)}>
                  <h3 className="card__name">{f.name}</h3>
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
