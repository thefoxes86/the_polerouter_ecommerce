import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import SEND_EMAIL_MUTATION from '../mutations/sendmail';

export default function Form() {
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [photo, setPhoto] = useState();
  const [text, setText] = useState();
  const [sending, setSending] = useState(false);
  const [sendedResponse, setSendedResponse] = useState();

  const [sendEmail, { data, loading, error }] = useMutation(
    SEND_EMAIL_MUTATION,
    {
      variables: {
        name,
        mail,
        photo,
        text,
      },
      onCompleted: (event) => {
        console.log(event);
        // On Success:
        // 1. Make the GET_CART query to update the cart with new values in React context.
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleResponse = (status, msg) => {
    if (status === 200) {
      console.log(status + ' - ' + msg);
      setSendedResponse(msg);
    } else {
      console.log(status + ' - ' + msg);
      setSendedResponse(msg);
    }
    setSending(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: mail,
        message: text,
        file: photo,
        name: name,
      }),
    });
    const textRes = await res.text();
    handleResponse(res.status, textRes);
  };

  return (
    <React.Fragment>
      <form className='form__contact' enctype='multipart/form-data'>
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
        <input
          type='submit'
          onClick={handleOnSubmit}
          className='button__black submit'
        />
        {sending && <span>Mail is sending</span>}
        {sendedResponse && <span>{sendedResponse}</span>}
      </form>
    </React.Fragment>
  );
}
