import React, { useState } from 'react';
import * as emailjs from 'emailjs-com';

const Apply = () => {
  const [emailResponse, setEmailResponse] = useState();

  const submitHandler = async e => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const topic = 'Farmer Application';
    const message = e.target[2].value;

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
    setEmailResponse(response.status === 200 ? 'Email sent.' : 'Error occured. Try again.');
  };

  return (
    <div className="apply__support">
      <h2 className="apply__txt">Join us today!</h2>
      <div className="form__div">
        <form className="apply__form support__form form" onSubmit={e => submitHandler(e)}>
          <label className="form__name label__name" htmlFor="name">
            Name
            <input className="form__field form__name input__name" id="name" type="text" required />
          </label>
          <label className="form__email label__email" htmlFor="email">
            Email
            <input className="form__field form__email input__email" id="email" type="email" required />
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

export default Apply;
