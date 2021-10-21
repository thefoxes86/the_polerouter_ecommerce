import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import SEND_EMAIL_MUTATION from '../mutations/sendmail';

export default function Form() {
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [subject, setSubject] = useState();
  const [text, setText] = useState();
  const [sending, setSending] = useState(false);
  const [sendedResponse, setSendedResponse] = useState();

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
        subject: subject,
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
          <span>Subject</span>
          <input type='input' onChange={(e) => setSubject(e.target.value)} />
        </label>
        <label htmlFor='text' className='textarea'>
          <span>Message</span>
          <textarea onChange={(e) => setText(e.target.value)} />
        </label>

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
