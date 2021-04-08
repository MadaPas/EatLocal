/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

import Map from './Map/Map';

const Home = () => {
  const history = useHistory();
  const buttonHandler = e => {
    history.push(e.target.value);
  };
  return (
    <>
      <section className="section hero">
        <div className="hero__content">
          <h1 className="hero__tagline">Quality food from Local Swedish farms to your door!</h1>
          <div className="hero__cta">
            <p className="hero hero__info">Contact-free delivery</p>
            <button type="button" className="hero__btn btn btn--green btn--shop" value="/boxes" onClick={e => buttonHandler(e)}>See Offers</button>
          </div>
        </div>
      </section>
      <section className="section boxes">
        <h2 className="content__title">Our Food Boxes</h2>
        <div className="section__content boxes__content card-container">
          <div className="column-three">
            <img className="content__info__img img" src="/images/boxes/vegetarian.jpg" alt="salad" />
            <button type="button" className="btn btn--white content__info--btn" value="/boxes/#Vegetarian" onClick={e => buttonHandler(e)}>Vegetarian</button>
          </div>
          <div className="column-three">
            <img className="content__info__img img" src="/images/boxes/family.jpg" alt="salmon" />
            <button type="button" className="btn btn--white content__info--btn" value="/boxes/#Family" onClick={e => buttonHandler(e)}>Family</button>
          </div>
          <div className="column-three">
            <img className="content__info__img img" src="/images/boxes/vegan.jpg" alt="wrap" />
            <button type="button" className="btn btn--white content__info--btn" value="/boxes/#Vegan" onClick={e => buttonHandler(e)}>Vegan</button>
          </div>
        </div>
      </section>
      <section className="section about">
        <div className="about__content section__content">
          <h2 className="content__title">Who we are</h2>
          <p className="content__info">
            We  are
            <span className="accent">Mobsters 4 Justice</span>
            {' '}
            - team of talanted & passionate web developers who want to connect bussy professional and local farm producers.
            Our mission is
            {' '}
            <span className="accent">Justice for Farmers</span>
            {' '}
            who have to sell their produce for lower prices since only a few big companies buy the produce in bulk. We give regular consumers the possibility to buy directly from farmers and give more control over prices to the farmers.
          </p>
        </div>
        <img className="about__img img" src="/images/home/artichokes.jpg" alt="artichokes" />
      </section>
      <section className="section farmers">
        <div className="section__content farmers__content">
          <h2 className="content__title">Swedish Farms</h2>
          <div className="content__info card-container">
            <div className="column-two">
              <img className="content__info__img img" src="/images/home/farmer.jpg" alt="farmer" />
              <p className="content__info__txt">We work with some of the best independent farmers and fisherman of Sweden. Find out more about them here.</p>
              <a className="btn btn--info content__info--btn" href="/farmers">Meet Our Farmers</a>
            </div>
            <div className="column-two">
              <img className="content__info__img img" src="/images/home/tomatoes.jpg" alt="tomatoes" />
              <p className="content__info__txt">Share your agricultural practices that focus on growing food through natural ecosystem management by joining our network.</p>
              <a className="btn btn--info content__info--btn" href="/apply">Become Our Member</a>
            </div>
agit                <a href="https://github.com/anastasia-pon"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
            <div className="column__author column-four">
              <img className="content__info__img img" src="/images/authors/madalina.jpg" alt="madalina" />
              <div className="content__info__name">Madalina Andreea</div>
              <div className="content__info__socials">
                <a href="https://www.linkedin.com/in/andreea-madalina-pascariu/"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/MadaPas"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
            <div className="column__author column-four">
              <img className="content__info__img img" src="/images/authors/valentina.jpg" alt="valentina" />
              <div className="content__info__name">Valentina</div>
              <div className="content__info__socials">
                <a href="https://www.linkedin.com/in/ko-va/"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/ko-va"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
