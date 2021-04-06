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
        <p className="faq__question">What is Lorem Ipsum?</p>
        <p className="faq__answer">From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.</p>
        <p className="faq__question">What is Lorem Ipsum?</p>
        <p className="faq__answer">From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.</p>
        <p className="faq__question">What is Lorem Ipsum?</p>
        <p className="faq__answer">From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.</p>
      </div>
      <form className="support__form form" onSubmit={e => submitHandler(e)}>
        <label className="form__name label__name" htmlFor="name">
          Name
          <input className="form__name input__name" id="name" type="text" required />
        </label>
        <label className="form__email label__email" htmlFor="email">
          Email
          <input className="form__email input__email" id="email" type="email" required />
        </label>
        <label className="form__topic label__topic" htmlFor="topic">
          Topic
          <input className="form__topic input__topic" id="topic" type="text" required />
        </label>
        <label className="form__message label__message" htmlFor="message">
          Message
          <textarea className="form__message" id="message" required />
        </label>
        <button className="form__btn btn btn--green" type="submit">Send</button>
        <p className="form__txt">{emailResponse}</p>
      </form>
    </div>
  );
};

export default Support;
