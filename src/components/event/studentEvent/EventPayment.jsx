import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { API_URL } from '../../../App';

const MySwal = withReactContent(Swal);

function EventPayment({myProps,myValues}) {
  const publishableKey =
    'pk_test_51MtBzSSDnEpAesVfjiCrzsO0bMAZdBCMazPkAEck0GWIefjCZq31WyM65YUopSsEObXl7LKglLHYQOgCBhVFGOs800dT95CROs';
  
  const eventPrice=myProps?.eventReducer?.sportEvent?.price;
  const priceForStripe = eventPrice * 100;
  console.log("Val of myProps inside eventPayment is:",myProps);
  console.log("Val of myValues inside eventPayment is:",myValues);
  const handleSuccess = async () => {
    const sendingDataDetails={
      eventId:myProps.eventReducer.sportEvent.id,
      studentEmail:myProps.userReducer.userEmail,
      hostingClg:myProps.eventReducer.sportEvent.host,
      collegeName:myProps.userReducer.userCollegeName,
      participatingSports:myValues.participating_sports
    }
    console.log("Val of sendingDataDetails inside eventPayment is:",sendingDataDetails);
    const studentEventRes = await axios.post(
      `${API_URL}/event/student/add`,
      // `https://sprots-event-api-2.onrender.com/event/student/add`,
      sendingDataDetails,{credentials:true}
    );
    
    console.log("studentEventRes received inside eventPayment is:", studentEventRes);
    // action.resetForm();
    
    myProps.hideForm();
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };
  const payNow = async token => {
    
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount: eventPrice* 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="container">
       <StripeCheckout
        stripeKey={publishableKey}
        label={`Pay ₹${eventPrice}/- & Join Event`}
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is ₹${eventPrice}/-`}
        token={payNow}
        currency="INR"
      />
    </div>
  );
}

export default EventPayment;