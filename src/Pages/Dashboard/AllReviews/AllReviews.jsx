import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { toast } from "react-toastify";
const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    axiosSecure.get("/all-reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiosSecure]);
  //console.log(reviews);
  const handleDeleteReview = (id) =>{
    axiosSecure.delete(`/review-delete/${id}`)
    .then(res=>{
        //console.log(res.data)
        if(res.data.deletedCount){
            toast.success('You have deleted a review')
            const remaining = reviews.filter(review=>review._id!==id)
            setReviews(remaining)
        }
    })
  }
  return (
    <div>
      <h2 className="text-4xl">All Reviews</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {reviews.map((review) => (
          <div key={review._id} className="p-6 w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src={review.userImg}
                alt="Shoes"
              />
            </figure>
            <div className="text-left my-2">
              <h2 className="card-title"></h2>
              <p><span className="font-bold">Reviewer : </span>{review.userName}</p>
              <p><span className="font-bold">Review : </span>{review.review}</p>
              <p><span className="font-bold">University name : </span>{review.universityName}</p>
              <p><span className="font-bold">Subject Category : </span>{review.subjectName}</p>
              <p className="flex items-center gap-1"><span className="font-bold ">Rating : </span> <Rating style={{ maxWidth: 100 }} value={review.rating} readOnly/></p>
              <p><span className="font-bold">Review Date : </span>{review.appliedDate}</p>
              <div className="card-actions justify-end">
              <button className="btn bg-red-500 text-2xl text-white" onClick={()=>handleDeleteReview(review._id)}><MdDelete/></button>  
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
