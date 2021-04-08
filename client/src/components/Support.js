/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as emailjs from 'emailjs-com';

const Support = () => {
  const [emailResponse, setEmailResponse] = useState();

  const submitHandler = async e => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const topic = e.target[2].value;
    const message = e.target[3].value;

    const response = await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: email,
        name,
        message,
        subject: topic,
      },
      process.env.REACT_APP_EMAILJS_USER_ID,
    );
    e.target[0].value = '';
    e.target[1].value = '';
    e.target[2].value = '';
    e.target[3].value = '';
    setEmailResponse(response.status === 200 ? 'Email sent.' : 'Error occured. Try again.');
  };

  return (
    <div className="support">
      <div className="support__faq">
        <h2 className="faq">Frequently Asked Questions</h2>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" id="faq-drawer1" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer1">Why would I choose your food box instead of your competitor? </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">
                We want to give credit to Swedish farmers! They deserve to get a good price for their produce. We make an effort to create tasty menus based only on Swedish products.
              </p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" id="faq-drawer2" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer2">
            Why can
            {'\u0027'}
            t I order a box for midsummer already?
          </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">
                Since we use only Swedish products, we have to adapt our menus to the ingredients which are in season and available. We want to offer the best quality, so we don
                {'\u0027'}
                t publish our menus more than two weeks in advance.
              </p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" id="faq-drawer3" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer3">
            I
            {'\u0027'}
            m allergic to red vegetables but I want your vegan box. Can it be customised?
          </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">
                We are developing a more automatic system in the future, but for the moment you can send us a message in the contact page after you have bought your subscription and we will customise your boxes!
              </p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" id="faq-drawer4" type="checkbox" />
          <label className="faq-drawer__title" id="faq-drawer4" htmlFor="faq-drawer4">
            What
            {'\u0027'}
            s in it for you?
          </label>
          <div className="faq-drawer__content-wrapper">
            <div className="ffaq-drawer__content">
              <p className="faq__answer">We take a little profit from selling out food boxes in order to cover our costs and pay our salaries.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="form__div">
        <form className="support__form form" onSubmit={e => submitHandler(e)}>
          <label className="form__name label__name" htmlFor="name">
            Name
            <input className="form__field form__name input__name" id="name" type="text" required />
          </label>
          <label className="form__email label__email" htmlFor="email">
            Email
            <input className="form__field form__email input__email" id="email" type="email" required />
          </label>
          <label className="form__topic label__topic" htmlFor="topic">
            Topic
            <input className="form__field form__topic input__topic" id="topic" type="text" required />
          </label>
          <label className="form__message label__message" htmlFor="message">
            Message
            <textarea className="form__field form__message" id="message" required />
          </label>
          <button className="form__btn btn btn--green" type="submit">Send</button>
          <p className="form__txt">{emailResponse}</p>
        </form>
      </div>
    </div>
  );
};

export default Support;
