/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
// import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

import Map from './Map/Map';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then(info => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect();
  };

  if (authState.isPending) {
    return (
    <>
      <header className="header">
        <div className="header__content">
          <h1 className="header__tagline">Quality food from Local Swedish farms to your door!</h1>
          <div className="header__cta">
            <p className="header header__info">Contact-free delivery</p>
            <a className="header__btn btn btn--info" href="/boxes">See Offers</a>
          </div>
        </div>
      </header>
      <section className="section boxes">
        <div className="section__content boxes__content">
          <h2 className="content__title">Our Food Boxes</h2>
          <div className="content__info">
            <div className="content__column">
              <img className="content__info__img img" src="/images/boxes/vegetarian.jpg" alt="salad" />
              <a className="btn btn--white content__info--btn" href="/boxes/#vegetarian">Vegetarian</a>
            </div>
            <div className="content__column">
              <img className="content__info__img img" src="/images/boxes/family.jpg" alt="salmon" />
              <a className="btn btn--white content__info--btn" href="/boxes/#family">Family</a>
            </div>
            <div className="content__column">
              <img className="content__info__img img" src="/images/boxes/vegan.jpg" alt="wrap" />
              <a className="btn btn--white content__info--btn" href="/boxes/#vegan">Vegan</a>
            </div>
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
        <img className="about__img" src="/images/home/artichokes.jpg" alt="artichokes" />
      </section>
      <section className="section farmers">
        <div className="section__content farmers__content">
          <h2 className="content__title">Swedish Farms</h2>
          <div className="content__info">
            <div className="content__column">
              <img className="content__info__img img" src="/images/home/farmer.jpg" alt="farmer" />
              <p className="content__info__txt">We work with some of the best independent farmers and fisherman of Sweden. Find out more about them here.</p>
              <a className="btn btn--info content__info--btn" href="/farmers">Meet Our Farmers</a>
            </div>
            <div className="content__column">
              <img className="content__info__img img" src="/images/home/tomatoes.jpg" alt="tomatoes" />
              <p className="content__info__txt">Share your agricultural practices that focus on growing food through natural ecosystem management by joining our network.</p>
              <a className="btn btn--info content__info--btn" href="/apply">Become Our Member</a>
            </div>
          </div>
        </div>
      </section>
      <Map farmersPage={false} />
      <section className="section authors">
        <div className="section__content authors_content">
          <h2 className="content__title">Developed By</h2>
          <div className="content__info">
            <div className="content__column">
              <img className="content__info__img img" src="/images/authors/juha.jpg" alt="juha" />
              <div className="content__info__socials">
                <a href="https://www.linkedin.com/in/juhakemppinen/"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/kemppi83"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
            <div className="content__column">
              <img className="content__info__img img" src="/images/authors/anastasia.jpg" alt="anastasia" />
              <div className="content__info__socials">
                <a href="https://www.linkedin.com/in/ana-ponomarenko/"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/anastasia-pon"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
            <div className="content__column">
              <img className="content__info__img img" src="/images/authors/madalina.jpg" alt="madalina" />
              <div className="content__info__socials">
                <a href="https://www.linkedin.com/in/andreea-madalina-pascariu/"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/MadaPas"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
            <div className="content__column">
              <img className="content__info__img img" src="/images/authors/valentina.jpg" alt="valentina" />
              <div className="content__info__socials">
                <a href="https://www.linkedin.com/in/ko-va/"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/ko-va"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
        )}

      </div>
    </div>
  );
};
export default Home;
