import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";

const EditReview = () => {
  const axiosPublic = useAxiosPublic();
  const [review, setReview] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  useEffect(() => {
    axiosPublic.get(`/single-review/${id}`).then((res) => {
      //console.log(res.data);
      setReview(res.data);
    });
  }, [axiosPublic, id]);
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    //console.log(data);
    const reviewData = {
      userName: user.displayName,
      userImg: user.photoURL,
      email: user.email,
      review: data.review,
      rating: data.rating,
      universityName: data.universityName,
      scholarshipName: data.scholarshipName,
      scholarshipId : review.scholarshipId,
    };
    await axiosPublic.patch(`/edit-review/${id}`, reviewData)
      .then((result) => {
        //console.log(result.data);
        if (result.data.modifiedCount > 0) {
          toast.success("Edited the Review successfully");
        }
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };

  return (
    <div>
      <h2 className="text-4xl">Edit Review</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Review</span>
            </label>
            <input
              {...register("review")}
              {...setValue("review", review.review)}
              type="text"
              placeholder="Review"
              className="input border-[#0AB99D]"
              required
            />
          </div>
          <div className="form-control">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <select
                {...register("rating", { required: true })}
                {...setValue("rating", review.rating)}
                className="select select-bordered"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
          </div>
          <div className="flex gap-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">University name</span>
              </label>
              <input
                {...register("universityName", { required: true })}
                type="text"
                readOnly
                defaultValue={review.universityName}
                placeholder=""
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Scholarship Name</span>
              </label>
              <input
                {...register("scholarshipName", { required: true })}
                type="text"
                defaultValue={review.scholarshipName}
                readOnly
                placeholder=""
                className="input border-[#0AB99D]"
                required
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn  bg-[#0AB99D] text-white">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
