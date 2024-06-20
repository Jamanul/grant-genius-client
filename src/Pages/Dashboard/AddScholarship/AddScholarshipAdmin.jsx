import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddScholarshipAdmin = () => {
    const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const image_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    //console.log(res.data);
    if (res.data.success) {
      const scholarshipData ={
        universityName: data.universityName,
        scholarshipCategory: data.scholarshipCategory,
        stipend: parseInt(data.stipend),
        universityLogo: res.data.data.display_url,
        scholarshipName: data.scholarshipName,
        appliedDegree: data.appliedDegree,
        subjectName : data.subjectName,
        scholarshipDescription: data.scholarshipDescription,
        serviceCharge: parseInt(data.serviceCharge),
        applicationFees: parseInt(data.applicationFees),
        applicationDeadline: parseInt(data.applicationDeadline),
        tuitionFees: parseInt(data.tuitionFees),
        universityWorldRank: parseInt(data.universityWorldRank),
        scholarshipId : parseInt(Math.floor(Math.random()*10000000000000)),
        postDate: new Date(Date()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        universityLocation: {
          country: data.country,
          city: data.city,
        },
      }
      axiosSecure.post('/all-scholarship-admin',scholarshipData)
      .then(res=>{
        if(res.data.acknowledged){
            toast.success('you have added a scholarship')
        }
      })
    }
  };
    return (
        <div>
      <h2 className="text-4xl">Add application</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex gap-2">
            <div className="form-control w-1/3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">University Name</span>
                </div>
                <input
                  {...register("universityName", { required: true })}
                  type="text"
                  placeholder="University Name"
                  className="input border-[#0AB99D]"
                  required
                />
              </label>
            </div>
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text">Scholarship Name</span>
              </label>
              <input
                {...register("scholarshipName", { required: true })}
                type="text"
                placeholder="Scholarship Name"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/3">
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
          </div>
          <div className="flex gap-2">
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text">Scholarship Category</span>
              </label>
              <select
                {...register("scholarshipCategory", { required: true })}
                className="select select-bordered"
              >
                <option disabled>Pick one</option>
                <option>Full Fund</option>
                <option>Partial</option>
                <option>Self Fund</option>
              </select>
            </div>
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text">Subject Category</span>
              </label>
              <select
                {...register("subjectName", { required: true })}
                className="select select-bordered"
              >
                <option disabled>Pick one</option>
                <option>Agriculture</option>
                <option>Engineering</option>
                <option>Doctor</option>
              </select>
            </div>
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text">Degree</span>
              </label>
              <select
                {...register("appliedDegree", { required: true })}
                className="select select-bordered"
              >
                <option disabled>Pick one</option>
                <option>Diploma</option>
                <option>Bachelors</option>
                <option>Masters</option>
              </select>
            </div>
           
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">scholarship Description</span>
            </label>
            <input
              {...register("scholarshipDescription", { required: true })}
              type="text"
              placeholder="Scholarship Description"
              className="input border-[#0AB99D]"
              required
            />
          </div>
          <div className="flex gap-2">
           
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">Tuition Fees($)</span>
              </label>
              <input
                {...register("tuitionFees", { required: true })}
                type="number"
                placeholder="stipend"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">Scholarship Stipend($)</span>
              </label>
              <input
                {...register("stipend", { required: true })}
                type="number"
                placeholder="stipend"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">Service Charge($)</span>
              </label>
              <input
                {...register("serviceCharge", { required: true })}
                type="number"
                placeholder="Service Charge"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">Application Fees ($)</span>
              </label>
              <input
                {...register("applicationFees", { required: true })}
                type="number"
                placeholder="Application Fees"
                className="input border-[#0AB99D]"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
          <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">scholarship Deadline</span>
              </label>
              <input
                {...register("applicationDeadline", { required: true })}
                type="date"
                placeholder=""
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">University Country</span>
              </label>
              <input
                {...register("country", { required: true })}
                type="text"
                placeholder="University Country"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">University City</span>
              </label>
              <input
                {...register("city", { required: true })}
                type="text"
                placeholder="University City"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text">University World Rank</span>
              </label>
              <input
                {...register("universityWorldRank", { required: true })}
                type="number"
                placeholder="University World Rank"
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

export default AddScholarshipAdmin;