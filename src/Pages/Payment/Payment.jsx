import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { useLoaderData, useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
const stripePromise =loadStripe(import.meta.env.VITE_PK_KEY)
const Payment = () => {
    const singleData =useLoaderData()
    //console.log(id)
    // const axiosPublic = useAxiosPublic();
    // const [loading,setLoading]=useState(true)
    // const [singleData, setSingleData] = useState([]);
    // useEffect(() => {
    //     axiosPublic.get(`/all-scholarship/${id}`).then((res) => {
    //       console.log(res.data);
    //       setSingleData(res.data)
    //       setLoading(false);
    //     });
    // }, [axiosPublic, id]);
    //console.log(singleData)
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm singleData={singleData}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;