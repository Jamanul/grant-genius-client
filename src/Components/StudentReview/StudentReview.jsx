import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './styles-review.css';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
const StudentReview = () => {
    const [reviews,setReviews]=useState([])
    const axiosPublic =useAxiosPublic()
    useState(()=>{
        axiosPublic.get(`/all-review`)
        .then(res=>{
            //console.log(res.data)
            setReviews(res.data)
        })
    },[])
    return (
        <div>
            <h2 className='text-5xl'>Student review section</h2>
            <div>
            <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews.slice(0,10)?.map((data) => (
            <SwiperSlide className="rounded-3xl border my-12" key={data._id}>
                <div>
                    <div className="flex justify-between w-96 object-cover">
                    <div className="w-24 h-24">
                    <img className="w-10 rounded-full mt-2" src={data.userImg} alt="" />
                    </div>
                    <div className="mt-2 flex flex-col text-left">
                        <p><span className="font-bold">Reviewer : </span>{data.userName}</p>
                        <p className="flex items-center gap-1"><span className="font-bold ">Rating : </span> <Rating style={{ maxWidth: 100 }} value={data.rating} readOnly/></p>
                        
                        <p><span className="font-bold">Reviewed On : </span>{data.appliedDate}</p>
                    </div>
                    
                    </div>
                    <div className="divider">Review</div>
                    <div className="my-4">{data.review}</div>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
            </div>
        </div>
    );
};

export default StudentReview;