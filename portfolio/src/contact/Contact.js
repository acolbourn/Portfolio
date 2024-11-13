import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import ContactForm from './ContactForm';

export default function Contact() {
  const url =
    'https://gmail.us4.list-manage.com/subscribe/post?u=11e3807d1d0c5825bc7a2d077&amp;id=249fd95a22&amp;f_id=000c1feaf0';
  // Note: url must be copied from Mailchimp embedded copy/paste box, will not work from viewing page source url

  return (
    <>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <>
            <ContactForm
              status={status}
              message={message}
              submitForm={(formData) => subscribe(formData)}
            />
          </>
        )}
      />
    </>
  );
}
