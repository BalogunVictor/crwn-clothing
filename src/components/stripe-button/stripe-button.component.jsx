import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51Lb4NfFES7UMzSOax1ghEhuhwfI4Rhm32aS9wfsxAtggQ2YPYVoSeKiQAhA53xF1IMLo9BYxp4seTXYRbcRRTmMf00ijox7OLA'

  const onToken = token => {
    console.log(token);
    alert('Payment Sucessful');
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

 