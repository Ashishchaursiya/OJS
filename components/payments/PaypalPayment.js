import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Cookies from "js-cookie";
const PayPalCheckout = ({amount,postOrder}) => {
 
  const token = Cookies.get("token");
  const createOrder = (data, actions) => {
    console.log('create order',data)
 
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    console.log('onapprove',data)
    
    return actions.order.capture().then(function (details) {
        postOrder()
      console.log(details);
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Ab4GOYM71RTyN-GEXmQu3JJ5knG6B5GXRMT0jl8jq2cziM8-XzN-M3vljtugo47itghswsAYs0QRml2u" }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
