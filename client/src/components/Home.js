/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

import Map from './Map/Map';

const Home = () => {
  const history = useHistory();
  const buttonHandler = e => {
    history.push(e.target.parentElement.id);
  };
  useEffect(() => {
    document.getElementById('header-content').classList.add('landing');
  }, []);
  // useEffect
  // console.log(ReactDOM.getElementById('header-content'));
  // document.getElementById('header-content').classList.add('landing');
  return (
    <>
      <section className="landing-page">
        {/* <hr /> */}
        <section className="hero">
          <h1 className="hero__tagline">
            Quality food from
            <br />
            Local Swedish farms
            <br />
            to your door!
          </h1>
          <div className="hero__cta">
            <p className="hero__cta__info">Contact-free delivery</p>
            <button type="button" className="hero__btn--subscribe btn-green" value="/boxes" onClick={e => buttonHandler(e)}>Subscribe</button>
          </div>
        </section>
      </section>

      <section className="boxes-page">

        {/* <h2 className="content__title">Our Food Boxes</h2> */}
        <div className="section__content boxes__content card-container">
          <div className="column-three box-card vegeterian-box">
            <div className="box-content" id="/boxes/#Vegetarian" onClick={e => buttonHandler(e)}>
              <h4 className="box-name">
                {'\u00a0\u00a0'}
                Vegetarian
                <hr />
                {'\u00a0\u00a0'}
              </h4>
              <p className="box-desc">Favorite dishes for the entire family, made by fresh locally-sourced ingredients for 3 meals</p>
            </div>
          </div>
          <div className="column-three box-card family-box">
            <div className="box-content" id="/boxes/#Family" onClick={e => buttonHandler(e)}>
              <h4 className="box-name">
                {'\u00a0\u00a0'}
                Family
                <hr />
                {'\u00a0\u00a0'}
              </h4>
              <p className="box-desc">Mix of locally-sourced fish and meat dishes, garnished with fresh vegetables and high quality crops for 3 meals</p>
            </div>
          </div>
          <div className="column-three box-card vegan-box">
            <div className="box-content" id="/boxes/#Vegan" onClick={e => buttonHandler(e)}>
              <h4 className="box-name">
                {'\u00a0\u00a0'}
                Vegan
                <hr />
                {'\u00a0\u00a0'}
              </h4>
              <p className="box-desc">
                Prepare your dinner in 30 minutes with our healthy vegan fast
                &
                easy recepies.
              </p>
            </div>
          </div>
        </div>

      </section>

      <section className="section about-page">

        <div className="section__content about__content">
          <h2 className="content__title">About Us</h2>
          <p className="content__info-about">
            We are
            {' '}
            <span className="accent">Mobsters 4 Justice</span>
            {' '}
            - team of talented & passionate web developers who want to connect busy professionals and local farm producers.
            <br />
            Our mission is
            {' '}
            <span className="accent">Justice for Farmers</span>
            {' '}
            who have to sell their produce for lower prices since only a few big companies buy the produce in bulk. We give regular consumers the possibility to buy directly from farmers and give more control over prices to the farmers.
          </p>
        </div>

        <img className="about__img img" src="/images/home/artichokes.jpg" alt="artichokes" />

      </section>

      <section className="section farmers-page">
        <div className="section__content farmers__content">
          <h2 className="content__title">Swedish Farms</h2>
          <div className="content__info card-container">
            <div className="column-two">
              <img className="content__info__img img-farm" src="/images/home/farmer.jpg" alt="farmer" />
              <p className="content__info__txt">We work with some of the best independent farmers and fishermen of Sweden. Find out more about them here.</p>
              <div className="column-two__info">
                <a className="btn btn--info content__info--btn" href="/farmers">Meet Our Farmers</a>
              </div>
            </div>
            <div className="column-two">
              <img className="content__info__img img-farm" src="/images/home/tomatoes.jpg" alt="tomatoes" />
              <p className="content__info__txt">Share your agricultural practices that focus on growing food through natural ecosystem management by joining our network.</p>
              <div className="column-two__info">
                <a className="btn btn--info content__info--btn" href="/apply">Become Our Member</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Map farmersPage={false} />
      <section className="section authors">
        <div className="section__content authors_content">
          <h2 className="content__title developed-by__title">Developed By</h2>
          <div className="content__info card-container">
            <figure className="column__author column-four figure">
              <blockquote className="author__desc">If you have seen my profile, you must have noticed my CERN nuclear power. Web development is very nuclear fusion. I am really after french and CERN.</blockquote>
              <div className="author">
                <img className="content__info__img img img_author" src="/images/authors/juha.jpg" alt="juha" />
                <h5 className="content__info__name">
                  Juha Kemppinen
                  {' '}
                  <span className="author__span">Fullstack Developer</span>
                </h5>
              </div>
              <div className="content__info__socials">
                <a className="social__icon social__icon--linkedin" href="https://www.linkedin.com/in/juhakemppinen/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className="social__icon social__icon--github" href="https://github.com/kemppi83" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </figure>
            <figure className="column__author column-four figure">
              <blockquote className="author__desc">I am told I am a very good board game professional. It is one of my favourite pastimes. If you have seen my profile, you will know that I am all about board games.</blockquote>
              <div className="author">
                <img className="content__info__img img img_author" src="/images/authors/anastasia.jpg" alt="anastasia" />
                <h5 className="content__info__name">
                  Anastasia Ponomarenko
                  {' '}
                  <span className="author__span">Fullstack Developer</span>
                </h5>
              </div>
              <div className="content__info__socials">
                <a className="social__icon social__icon--linkedin" href="https://www.linkedin.com/in/ana-ponomarenko/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className="social__icon social__icon--github" href="https://github.com/anastasia-pon" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </figure>
            <figure className="column__author column-four figure">
              <blockquote className="author__desc">I am a fairy kind of person. The first thing people usually notice about me is my fairy personality. I work as a web dev, helping fairy. My ideal world would involve fairies.</blockquote>
              <div className="author">
                <img className="content__info__img img img_author" src="/images/authors/madalina.jpg" alt="madalina" />
                <h5 className="content__info__name">
                  Madalina Andreea
                  {' '}
                  <span className="author__span">Fullstack Developer</span>
                </h5>
              </div>
              <div className="content__info__socials">
                <a className="social__icon social__icon--linkedin" href="https://www.linkedin.com/in/andreea-madalina-pascariu/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className="social__icon social__icon--github" href="https://github.com/MadaPas" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </figure>
            <figure className="column__author column-four figure">
              <blockquote className="author__desc">
                Meow, meow meow meow meow meow. Meow meow meow meow - meow meow. Meow meow! Meow meow meow meow.”
                <br />
                - My cat once said.
              </blockquote>
              <div className="author">
                <img className="content__info__img img img_author" src="/images/authors/valentina.jpg" alt="valentina" />
                <h5 className="content__info__name">
                  Valentina Kochegarova
                  {' '}
                  <span className="author__span">Fullstack Developer</span>
                </h5>
              </div>
              <div className="content__info__socials">
                <a className="social__icon social__icon--linkedin" href="https://www.linkedin.com/in/ko-va/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className="social__icon social__icon--github" href="https://github.com/ko-va" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
