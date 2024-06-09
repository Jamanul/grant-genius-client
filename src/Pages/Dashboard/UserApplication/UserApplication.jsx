import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserApplication = () => {
  const { user } = useAuth();
  const [appliedApplications, setAppliedApplications] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get(`/applied-scholarships?email=${user.email}`).then((res) => {
      setAppliedApplications(res.data);
    });
  }, [axiosPublic, user.email]);

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
            icon: "success"
          });
        });
      }
    });
  };

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
              <th>Delete</th>
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
                <Link to='/edit'><button className="btn bg-[#0AB99D] text-white">
                      Edit
                    </button></Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(singleApplication._id)}
                    className="btn bg-red-500 text-white"
                  >
                    Cancel
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
