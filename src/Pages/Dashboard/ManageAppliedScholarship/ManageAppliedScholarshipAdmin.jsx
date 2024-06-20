import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';

const ManageAppliedScholarshipAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [singleScholarshipData, setScholarshipSingleData] = useState([]);
    const [allAppliedScholarship, setAllAppliedScholarship] = useState([]);
    const { loading, user } = useAuth();
    useEffect(() => {
        axiosSecure.get("/all-applied-scholarship-admin").then((res) => {
          setAllAppliedScholarship(res.data);
        });
      }, [axiosSecure]);
      const handleFeedback = (e) => {
        const form = e.target;
        const feedback = form.feedback.value;
        const id = form.id.value;
        //console.log(id, feedback);
        axiosSecure.patch(`/applied-application-feedback-admin/${id}`,{feedback})
        .then(res=>{
            if(res.data.modifiedCount>0){
                toast.success('You have given a feedback')
            }
        })
      };
      const handleTwoFunction = (id,modal) => {
        document.getElementById(`my_modal_${modal}`).showModal();
        //console.log(id);
        const selectedOne = allAppliedScholarship.filter(
          (singleData) => singleData._id === id
        );
        //console.log(selectedOne);
        setScholarshipSingleData(selectedOne);
      };
       const handleCancel =(id)=>{
        axiosSecure.patch(`/applied-application-status-admin/${id}`,{status: 'rejected'})
        .then(res=>{console.log(res.data)
        toast.success('You have canceled this application.')
        }
        )
       }
    return (
        <div>
      <h2 className="text-4xl">Manage Applied Scholarship</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>University Name</th>
              <th>Scholarship Name</th>
              <th>Scholarship Category</th>
              <th>Subject Category</th>
              <th>Applied Degree</th>
              <th>Application Fee</th>
              <th>Service Charge</th>
              <th>Details</th>
              <th>Feedback</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allAppliedScholarship.map((appliedScholarship, idx) => (
              <tr key={appliedScholarship._id}>
                <th>{idx + 1}</th>
                <td>{appliedScholarship.universityName}</td>
                <td>{appliedScholarship.scholarshipName}</td>
                <td>{appliedScholarship.scholarshipCategory}</td>
                <td>{appliedScholarship.subjectName}</td>
                <td>{appliedScholarship.degree}</td>
                <td>{appliedScholarship.applicationFees} $</td>
                <td>{appliedScholarship.serviceCharge} $</td>
                <td>
                  <button className="">
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="btn bg-[#0AB99D] text-white"
                      onClick={() => handleTwoFunction(appliedScholarship._id,'1')}
                    >
                      Details
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        {singleScholarshipData.map((singleData) => <div key={singleData._id}><p className="py-4">
                            <span className=" font-bold">
                              {" "}
                              Applied University
                            </span>{" "}
                            : {singleData.universityName}
                          </p>
                          <p className="py-4">
                            <span className=" font-bold"> Applied Degree</span> :{" "}
                            {singleData.degree}
                          </p>
                          <p className="py-4">
                            <span className=" font-bold">
                              {" "}
                              Applied Scholarship Category
                            </span>{" "}
                            : {singleData.scholarshipCategory}
                          </p></div>
                          
                        )}
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn  bg-[#0AB99D] text-white">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </button>
                </td>
                <td>
                  <button
                    className="btn bg-[#0AB99D] text-white"
                    onClick={() => handleTwoFunction(appliedScholarship._id,'2')}
                  >
                    Feedback
                  </button>
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <div className="modal-action">
                        <form onSubmit={handleFeedback} method="dialog">
                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text">Feedback</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Feedback"
                              className="input border-[#0AB99D] w-[470px]"
                              name="feedback"
                              required
                            />
                          </div>
                          {singleScholarshipData.map((singleData) => <div key={singleData._id}>

                          <div className="form-control hidden">
                            <label className="label">
                              <span className="label-text">id</span>
                            </label>
                            <input
                              type="text"
                              placeholder="id"
                              defaultValue={
                                singleData._id
                              }
                              className="input border-[#0AB99D]"
                              name="id"
                              required
                            />
                          </div>
                          </div>
                          
                        )}
                          
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn bg-[#0AB99D] my-2 text-white">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
                <td>
                  <button onClick={()=>handleCancel(appliedScholarship._id)} className="btn bg-red-500 text-white">
                    Cancel
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageAppliedScholarshipAdmin;