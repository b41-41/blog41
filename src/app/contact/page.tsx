import FullscreenOverlay from '@/common/FullscreenOverlay';
import ContactOverlay from '@/app/contact/_component/ContactOverlay';
import React from 'react';

const ContactPage = () => {
  return (
    <>
      <FullscreenOverlay>
        <ContactOverlay />
      </FullscreenOverlay>
      <div>page</div>
    </>
  );
};

export default ContactPage;
