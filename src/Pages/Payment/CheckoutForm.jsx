import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import ApplicantsForm from "./ApplicantsForm";


const CheckoutForm = ({singleData}) => {
  
  const axiosSecure = useAxiosSecure();
  const {user} =useAuth()
  const [hiddenElement,setHiddenElement]=useState(false)
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
            toast.success('Payment done successfully')
            setHiddenElement(true)
        }
        else{
            toast.error('Something went wrongs')
            setHiddenElement(false)
        }
    }
  };
  return (
    <div>
        <form className={hiddenElement ? 'hidden': 'block'} onSubmit={handleOnSubmit}>
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
    <ApplicantsForm singleData={singleData} hiddenElement={hiddenElement}></ApplicantsForm>
    </div>
  );
};

export default CheckoutForm;
