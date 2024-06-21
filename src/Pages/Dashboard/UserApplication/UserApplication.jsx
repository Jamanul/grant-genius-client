import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserApplication = () => {
  const { user } = useAuth();
  const [appliedApplications, setAppliedApplications] = useState([]);
  const [singleScholarshipData, setScholarshipSingleData] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate =useNavigate()
  const handleReview = (e) => {
    // e.preventDefault();
    //console.log(e.target.review.value);
    const form = e.target
    const review =form.review.value
    const rating = parseInt(form.rating.value)
    const subjectName = form.scholarshipName.value
    const universityName =form.universityName.value
    const scholarshipId =parseInt(form.scholarshipId.value)
    const reviewData = {
      review,
      rating,
      subjectName,
      universityName,
      scholarshipId,
      userName : user.displayName,
      userImg : user.photoURL,
      email : user.email,
      appliedDate: new Date(Date()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    }
    axiosPublic.post('/review',reviewData)
    .then(res=>{
      //console.log(res.data)
      if(res.data.acknowledged){
        toast.success('Your review has been posted.')
      }
      
    })
    .catch(()=>{
      toast.error('something went wrong')
    })
  };
  useEffect(() => {
    axiosPublic.get(`/applied-scholarships?email=${user.email}`).then((res) => {
      setAppliedApplications(res.data);
    });
  }, [axiosPublic, user.email]);
  const handleTwoFunction = (id,modal) => {
    document.getElementById(`my_modal_${modal}`).showModal();
    //console.log(id);
    const selectedOne = appliedApplications.filter(
      (singleData) => singleData._id === id
    );
    console.log(selectedOne);
    setScholarshipSingleData(selectedOne);
  };
  const handleDelete = (id) => {
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
        axiosPublic.delete(`/applied-scholarship-delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            const remaining = appliedApplications.filter(
              (data) => data._id !== id
            );
            setAppliedApplications(remaining);
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };
  const handleEditRoute =(data)=>{
    //console.log(data)
    if(data.status === 'processing'){
      toast.error('You can not edit application while processing')
    }
    if(data.status === 'rejected'){
      toast.error('you can not edit application while it already got rejected')
    }
    else(
      navigate(`/dashboard/edit/${data._id}`)
    )
  }
  return (
    <div>
      <h2 className="text-4xl">My applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Application Feedback</th>
              <th>Applied Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Application Status</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Cancel</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {appliedApplications?.map((singleApplication, idx) => (
              <tr key={singleApplication._id}>
                <th>{idx + 1}</th>
                <th>{singleApplication.universityName}</th>
                <td>
                  {singleApplication.universityLocation?.city},
                  {singleApplication.universityLocation?.country}
                </td>
                <td>
                  {singleApplication.feedback
                    ? singleApplication.feedback
                    : "None"}
                </td>
                <td>{singleApplication.degree}</td>
                <td>{singleApplication.applicationFees} $</td>
                <td>{singleApplication.serviceCharge} $</td>
                <td>
                  {singleApplication.status
                    ? singleApplication.status
                    : "Pending"}
                </td>
                <td>
                  <Link
                    to={`../../scholarship/${singleApplication.scholarshipId}`}
                  >
                    <button className="btn bg-[#0AB99D] text-white">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  {/* <Link to={`/dashboard/edit/${singleApplication._id}`}>
                    <button className="btn bg-[#0AB99D] text-white">
                      Edit
                    </button>
                  </Link> */}
                 
                    <button onClick={()=>handleEditRoute(singleApplication)} className="btn bg-[#0AB99D] text-white">
                      Edit
                    </button>
                 
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(singleApplication._id)}
                    className="btn bg-red-500 text-white"
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button className=" ">
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="btn bg-[#0AB99D] text-white"
                      onClick={() => handleTwoFunction(singleApplication._id,'1')}
                    >
                      Review
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          Please give your review.
                        </h3>
                        <p className="py-4">Press ESC key close</p>
                        <div className="">
                          <form onSubmit={handleReview} method="dialog">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Your Review</span>
                              </label>
                              <input
                                type="text"
                                name="review"
                                placeholder="Your Review"
                                className="input border-[#0AB99D]"
                                required
                              />
                            </div>
                            <div className="form-control">
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text">rating</span>
                                </div>
                                <select
                                  name="rating"
                                  className="select select-bordered"
                                  required
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
                            <div className="hidden">
                              <input
                                type="text"
                                name="scholarshipName"
                                defaultValue={singleScholarshipData[0]?.scholarshipName}
                                placeholder=""
                                className="input border-[#0AB99D]"
                                required
                              />
                              <input
                                type="text"
                                name="universityName"
                                defaultValue={singleScholarshipData[0]?.universityName}
                                placeholder="Your Review"
                                className="input border-[#0AB99D]"
                                required
                              />
                              <input
                                type="text"
                                name="scholarshipId"
                                defaultValue={singleScholarshipData[0]?.scholarshipId}
                                placeholder="Your Review"
                                className="input border-[#0AB99D]"
                                required
                              />
                            </div>
                            <button
                              onSubmit={handleReview}
                              className="btn my-2 bg-[#0AB99D] text-white"
                            >
                              Give Review
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
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

export default UserApplication;
