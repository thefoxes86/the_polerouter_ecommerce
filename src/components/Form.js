import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import SEND_EMAIL_MUTATION from '../mutations/sendmail';

export default function Form() {
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [photo, setPhoto] = useState();
  const [text, setText] = useState();
  const [sendEmail, { data, loading, error }] =
    useMutation(SEND_EMAIL_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendEmail();

    console.log(data);
  };

  return (
    <React.Fragment>
      <form className='form__contact' onSubmit={handleSubmit}>
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor='name' className='input__1'>
          <span>Name</span>
          <input onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor='mail' className='input__2'>
          <span>Email</span>
          <input onChange={(e) => setMail(e.target.value)} />
        </label>
        <label htmlFor='photo' className='input__3'>
          <span>Photo</span>
          <input
            type='file'
            placeholder='no file chosen'
            onChange={(e) => setPhoto(e.target.value)}
          />
        </label>
        <label htmlFor='text' className='textarea'>
          <span>Message</span>
          <textarea onChange={(e) => setText(e.target.value)} />
        </label>

        <div style={{ width: '100%', display: 'block' }}>
          {error && <span>There was an error on mail sending, retry!</span>}
          {loading && <span>Mail Sending...</span>}
          {data && <span>{data.sendEmail.message}</span>}
        </div>
        <input type='submit' className='button__black submit' />
      </form>
    </React.Fragment>
  );
}
