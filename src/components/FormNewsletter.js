import React, {useState} from "react";
import Mailchimp from 'react-mailchimp-form';

const apiKey = '140cdd3bf2f685e78bc1dfbbe2b59f0b-us8';
const actionUrl = 'https://thepolerouter.us8.list-manage.com/subscribe/post?u=a9d06a38366ed7b307bac4864&amp;id=76bd4931f6';

export default function FormNewsletter() {
  
  return (
    <Mailchimp
    action={actionUrl}
    className="form__newsletter"
    messages = {
      {
        sending: "Sending...",
        success: "Thank you for subscribing!",
        error: "An unexpected internal error has occurred.",
        empty: "You must write an e-mail.",
        duplicate: "Too many subscribe attempts for this email address",
        button: "subscribe"
      }
    }
    fields={[{
      name: 'EMAIL',
      placeholder: 'enter your email',
      type: 'email',
      required: true
    }
    ]}
    />
    
  );
}