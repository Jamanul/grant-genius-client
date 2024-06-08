import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";


const CheckoutForm = ({singleData}) => {
  
  const axiosSecure = useAxiosSecure();
  const {user} =useAuth()
 
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const [error, setError] = useState("");
  const elements = useElements();
  //console.log(singleData)
  //console.log(singleData.applicationFees)
    // const {data: singleUniData}=useQuery({
    //     queryKey: ['singleUniData'],
    //     queryFn: async ()=>{
    //         const res = await axiosPublic.get(`/all-scholarship/${id}`)
    //         return res.data
    //     }
    // })
    // console.log(singleUniData)
 

  useEffect(() => {
    axiosSecure
      .post(`/create-payment-intent`,{price: singleData.applicationFees})
      .then((res) => {console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
    });
  }, [axiosSecure, singleData.applicationFees]);
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error, "error");
      setError(error.message);
    } else {
      console.log(paymentMethod, "paymentMethod");
      setError(" ");
    }

    const { paymentIntent, error: err}=await stripe.confirmCardPayment (clientSecret,{
        payment_method:{
            card: card,
            billing_details:{
                email: user.email || 'anonymous',
                name: user.displayName || 'anonymous'
            }
        }
    })
    if(err){
        console.log('err')
    }
    if(paymentIntent){
        console.log('payment Intent',paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        }
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="border border-[#0AB99D] rounded-2xl p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        className="btn flex mt-2 bg-[#0AB99D] text-white"
        type="submit"
        disabled={!stripe || !clientSecret} 
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
    </form>
  );
};

export default CheckoutForm;
