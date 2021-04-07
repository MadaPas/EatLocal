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
          <label className="faq-drawer__title" htmlFor="faq-drawer1">Question one </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">
                Although the phrase is nonsense, it does have a long history. The phrase has been used for several centuries by typographers to show the most distinctive features of their fonts. It is used because the letters involved and the letter spacing in those combinations reveal, at their best, the weight, design, and other important features of the typeface. A 1994 issue of Before & After to a jumbled Latin version of a passage from de Finibus Bonorum et Malorum, a treatise on the theory of ethics written by Cicero in 45 B.C. The passage is taken from text that reads, Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit ..., which translates as, There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...
              </p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" id="faq-drawer2" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer2">Question two </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">
                From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.
              </p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" id="faq-drawer3" type="checkbox" />
          <label className="faq-drawer__title" htmlFor="faq-drawer3">Question three </label>
          <div className="faq-drawer__content-wrapper">
            <div className="faq-drawer__content">
              <p className="faq__answer">
                From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage. From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.
              </p>
            </div>
          </div>
        </div>
        <div className="faq-drawer">
          <input className="faq-drawer__trigger" id="faq-drawer4" type="checkbox" />
          <label className="faq-drawer__title" id="faq-drawer4" htmlFor="faq-drawer4">Question four </label>
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
