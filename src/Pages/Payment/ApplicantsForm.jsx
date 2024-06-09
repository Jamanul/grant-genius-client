import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
const ApplicantsForm = ({ hiddenElement, singleData }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  //console.log(user);
  const image_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    //console.log(data);
    //console.log(res.data);
    if (res.data.success) {
      const scholarshipData = {
        applicantName: user.displayName,
        userId: user.uid,
        userEmail: user.email,
        appliedDate: new Date(Date()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        scholarshipId : singleData.scholarshipId,
        phoneNumber: data.phoneNumber,
        photo: res.data.data.display_url,
        address: data.address,
        gender: data.gender,
        degree: data.degree,
        sscResult: data.sscResult,
        hscResult: data.hscResult,
        studyGap : data.studyGap,
        universityName: data.universityName,
        scholarshipCategory: data.scholarshipCategory,
        subjectName: data.subjectCategory,
        universityLocation: singleData.universityLocation,
        applicationFees:singleData.applicationFees,
        serviceCharge: singleData.serviceCharge
      };
      axiosPublic.post('/applied-scholarship',scholarshipData)
      .then(result=>{
        console.log(result.data)
        if(result.data.acknowledged){
             toast.success('Filled the information successfully')
        }
    })
    .catch(()=>{
      toast.error('something went wrong')
    })
    }
    
    
  };
  return (
    <div className={hiddenElement ? "block" : "hidden"}>
      <h2 className="text-4xl">Please fill out this form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            {...register("phoneNumber", { required: true })}
            type="number"
            placeholder="Phone Number"
            className="input border-[#0AB99D]"
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500">Please enter your phone Number</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select your image</span>
          </label>
          <input
            type="file"
            required
            {...register("image")}
            className="file-input w-full bg-[#0AB99D] max-w-xs"
          />{" "}
          <br />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Address (village,district,country)
            </span>
          </label>
          <input
            {...register("address", { required: true })}
            type="text"
            placeholder="address"
            className="input border-[#0AB99D]"
            required
          />
          {errors.address?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex gap-2">
          <div className="form-control w-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pick your Gender</span>
              </div>
              <select
                {...register("gender", { required: true })}
                className="select select-bordered"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
            {errors.gender && (
              <p className="text-red-500">Please enter your gender.</p>
            )}
          </div>
          <div className="form-control w-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pick your Degree</span>
              </div>
              <select
                {...register("degree", { required: true })}
                className="select select-bordered"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Diploma</option>
                <option>Bachelors</option>
                <option>Masters</option>
              </select>
            </label>
            {errors.degree && (
              <p className="text-red-500">Please enter your degree.</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">Ssc result(out of 5.00)</span>
            </label>
            <input
              {...register("sscResult", { required: true })}
              type="number"
              placeholder="Ssc Result"
              className="input border-[#0AB99D]"
              required
            />
            {errors.sscResult && (
              <p className="text-red-500">Please enter your ssc result</p>
            )}
          </div>
          <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">Hsc result(out of 5.00)</span>
            </label>
            <input
              {...register("hscResult", { required: true })}
              type="number"
              placeholder="Hsc Result"
              className="input border-[#0AB99D]"
              required
            />
            {errors.hscResult && (
              <p className="text-red-500">Please enter your Hsc result</p>
            )}
          </div>
          <div className="form-control w-1/3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Study gap(if you have)</span>
              </div>
              <select
                {...register("studyGap", { required: true })}
                className="select select-bordered"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">University name</span>
            </label>
            <input
              {...register("universityName", { required: true })}
              type="text"
              readOnly
              defaultValue={singleData.universityName}
              placeholder=""
              className="input border-[#0AB99D]"
              required
            />
          </div>
          <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">Scholarship Category</span>
            </label>
            <input
              {...register("scholarshipCategory", { required: true })}
              type="text"
              defaultValue={singleData.scholarshipCategory}
              readOnly
              placeholder=""
              className="input border-[#0AB99D]"
              required
            />
          </div>
          <div className="form-control w-1/3">
            <label className="label">
              <span className="label-text">Subject Category</span>
            </label>
            <input
              {...register("subjectCategory", { required: true })}
              type="text"
              defaultValue={singleData.subjectName}
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
  );
};

export default ApplicantsForm;
