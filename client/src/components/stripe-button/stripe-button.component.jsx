import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51Lb4NfFES7UMzSOax1ghEhuhwfI4Rhm32aS9wfsxAtggQ2YPYVoSeKiQAhA53xF1IMLo9BYxp4seTXYRbcRRTmMf00ijox7OLA'
  
  const onToken = token => {
    axios({
      url:'payment',
      method: 'post',
      data:{
        amount: priceForStripe,
        token
      }
    }).then(response => {
        alert('Payment Sucessful')
  }).catch(error => {
    console.log('payment error: ',JSON.parse(error));
    alert(
      'There was an issue with your payment. Please sure you use the provided credit card'
    )
  })
}
  return (
    <StripeCheckout
    label='Pay Now'
    name="CRWN Clothing LTD."
    billingAddress
    shippingAddress
    image="https://sendeyo.com/up/d/f3eb2117da"
    description={`Your total is $${price}`}
    amount= {priceForStripe}
    panelLabel= 'Pay Now'
    token = {onToken}
    stripeKey = {publishableKey}
    />

);
   
};

export default StripeCheckoutButton;

 