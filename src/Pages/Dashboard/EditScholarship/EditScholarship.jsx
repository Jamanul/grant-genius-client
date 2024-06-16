import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditScholarship = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [singleScholarship, setSingleScholarship] = useState([]);
  const image_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;
  useEffect(() => {
    axiosPublic.get(`/all-scholarships/${id}`).then((res) => {
      //console.log(res.data)
      setSingleScholarship(res.data);
    });
  }, [axiosPublic, id]);
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
      const scholarshipData = {
        universityName: data.universityName,
        scholarshipCategory: data.scholarshipCategory,
        stipend: data.stipend,
        universityLogo: res.data.data.display_url,
        scholarshipName: data.scholarshipName,
        scholarshipDescription: data.scholarshipDescription,
        serviceCharge: data.serviceCharge,
        applicationFees: data.applicationFees,
        applicationDeadline: data.applicationDeadline,
        universityLocation: {
          country: data.country,
          city: data.city,
        },
      };
      axiosPublic.patch(`/all-scholarship/${id}`,scholarshipData)
      .then(res=>{
        console.log(res.data)
        toast.success('You have edited it')
      })
      .catch(()=>{
        toast.error('something went wrong')
      })
    }
  };
  return (
    <div>
      <h2 className="text-4xl">Edit application</h2>
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
                  {...setValue(
                    "universityName",
                    singleScholarship.universityName
                  )}
                  type="text"
                  placeholder="universityName"
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
                {...setValue(
                  "scholarshipName",
                  singleScholarship.scholarshipName
                )}
                type="text"
                placeholder="scholarshipName"
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
                {...setValue("image", singleScholarship.universityLogo)}
                className="file-input w-full bg-[#0AB99D] max-w-xs"
              />{" "}
              <br />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Scholarship Category</span>
              </label>
              <input
                {...register("scholarshipCategory", { required: true })}
                {...setValue(
                  "scholarshipCategory",
                  singleScholarship.scholarshipCategory
                )}
                type="text"
                placeholder="scholarshipCategory"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Scholarship Stipend</span>
              </label>
              <input
                {...register("stipend", { required: true })}
                {...setValue("stipend", singleScholarship.stipend)}
                type="text"
                placeholder="stipend"
                className="input border-[#0AB99D]"
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">scholarship Description</span>
            </label>
            <input
              {...register("scholarshipDescription", { required: true })}
              {...setValue(
                "scholarshipDescription",
                singleScholarship.scholarshipDescription
              )}
              type="text"
              placeholder="Scholarship Description"
              className="input border-[#0AB99D]"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text">scholarship Deadline</span>
              </label>
              <input
                {...register("applicationDeadline", { required: true })}
                {...setValue(
                  "applicationDeadline",
                  singleScholarship.applicationDeadline
                )}
                type="date"
                placeholder="Scholarship Description"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text">Service Charge($)</span>
              </label>
              <input
                {...register("serviceCharge", { required: true })}
                {...setValue("serviceCharge", singleScholarship.serviceCharge)}
                type="number"
                placeholder="Scholarship Description"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text">Application Fees ($)</span>
              </label>
              <input
                {...register("applicationFees", { required: true })}
                {...setValue(
                  "applicationFees",
                  singleScholarship.applicationFees
                )}
                type="number"
                placeholder="Scholarship Description"
                className="input border-[#0AB99D]"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">University Country</span>
              </label>
              <input
                {...register("country", { required: true })}
                {...setValue(
                  "country",
                  singleScholarship.universityLocation?.country
                )}
                type="text"
                placeholder="Scholarship Description"
                className="input border-[#0AB99D]"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">University City</span>
              </label>
              <input
                {...register("city", { required: true })}
                {...setValue(
                  "city",
                  singleScholarship.universityLocation?.city
                )}
                type="text"
                placeholder="Scholarship Description"
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

export default EditScholarship;
