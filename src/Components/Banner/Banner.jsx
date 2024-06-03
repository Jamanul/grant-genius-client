import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const Banner = () => {
    const axiosPublic =useAxiosPublic()
    const {data: bannerData}=useQuery({
        queryKey:['bannerData'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/banner')
            return res.data
        }
    })
    //console.log(bannerData)
    return (
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
        {
            bannerData?.map(data=><SwiperSlide className="rounded-3xl" key={data.id}><div className="relative"><img src={data.imageUrl} alt="" />
            <div className="absolute top-3/4 md:top-auto md:bottom-16 left-1/4">
                <p className="text-white font-bold md:text-4xl">{data.title}</p>
                <p className="text-white hidden md:block">{data.description}</p>
            </div>
            
            </div></SwiperSlide>)
        }
        
        
      </Swiper>

        </div>
    );
};

export default Banner;