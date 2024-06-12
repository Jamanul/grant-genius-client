import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const {user} =useAuth()
    const axiosPublic =useAxiosPublic()
    const [reviews,setReviews]= useState([])
    useEffect(()=>{
        axiosPublic.get(`/review?email=${user.email}`)
        .then(res=>{
            //console.log(res.data)
            setReviews(res.data)
        })
    },[axiosPublic, user.email])
    const handleDelete = (id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/review-delete/${id}`)
                .then(res=>{
                if (res.data.deletedCount > 0) {
                  const remaining = reviews.filter(
                    (data) => data._id !== id
                  );
                  setReviews(remaining);
                }
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              });
            }
          });
      
            
    }
    return (
        <div>
            <h2 className="text-4xl">My Reviews</h2>
            <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comment</th>
              <th>Review Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review, idx) => (
              <tr key={review._id}>
                <th>{idx + 1}</th>
                <th>{review.scholarshipName}</th>
                <td>
                    {review.universityName}
                </td>
                <td>
                  {review.review}
                </td>
                <td>{review.appliedDate}</td>
                <td>
                  <Link to={`/dashboard/edit/${review._id}`}>
                    <button className="btn bg-[#0AB99D] text-white">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default MyReviews;