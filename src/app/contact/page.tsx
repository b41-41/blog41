import FullscreenOverlay from '@/common/FullscreenOverlay';
import ContactOverlay from '@/app/contact/_component/ContactOverlay';
import React from 'react';
import Contact from './_component/Contact';

const ContactPage = () => {
  return (
    <>
      <FullscreenOverlay>
        <ContactOverlay />
      </FullscreenOverlay>
      <Contact />
    </>
  );
};

export default ContactPage;
