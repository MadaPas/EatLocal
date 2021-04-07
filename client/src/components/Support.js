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
        <h2 className="faq">FAQ</h2>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer">Question one </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.</p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer">Question two </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.</p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer">Question three </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.</p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer">Question four </label>
          <div className="faq-drawer__content-wrapper">
            <div className="ffaq-drawer__content">
              <p className="faq__answer">From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.</p>
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
