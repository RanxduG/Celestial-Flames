import React from 'react';
import OrderSummary from '../Components/OrderSummary/OrderSummary.jsx';
import Invoice from '../Components/Invoice/Invoice.jsx';
import UploadReceipt from '../Components/UploadReceipt/UploadReceipt.jsx';


const ContactUs = () => {

  return (
    <div>
      <OrderSummary/>
      <Invoice/>
      <UploadReceipt/>
    </div>
  );
}

export default ContactUs;