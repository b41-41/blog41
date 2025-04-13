import FullscreenOverlay from '@/common/FullscreenOverlay';
import React from 'react';
import Contact from './_component/Contact';
import ContactOverlay from './_component/ContactOverlay';

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
