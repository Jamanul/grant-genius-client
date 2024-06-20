import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import useScholarship from '../../../Hooks/useScholarship';

const ManageScholarshipAdmin = () => {
    const [scholarshipData,refetch]=useScholarship()
    const axiosSecure =useAxiosSecure()
    const handleDeleteScholarship =(id)=>{
        axiosSecure.delete(`/all-scholarship-delete-admin/${id}`)
        .then(res=>{
          if(res.data.deletedCount>0){
            toast.success('deleted a scholarship')
            refetch()
          }
          //console.log(res.data)
          
        })
    }
    return (
        <div>
            <h2 className="text-4xl">Manage Scholarship</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Scholarship Name</th>
        <th>University Name</th>
        <th>Scholarship Category</th>
        <th>Applied Degree</th>
        <th>Application Fee</th>
        <th>Details</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
        {
            scholarshipData.map((scholarship,idx)=> <tr key={scholarship._id}>
                <th>{idx+1}</th>
                <td>{scholarship.scholarshipName}</td>
                <td>{scholarship.universityName}</td>
                <td>{scholarship.scholarshipCategory}</td>
                <td>{scholarship.appliedDegree}</td>
                <td >{scholarship.applicationFees} $</td>
                <td><Link to={`/scholarship/${scholarship.scholarshipId}`}><button className="btn bg-[#0AB99D] text-white">Details</button></Link></td>
                <td><Link to={`../edit-scholarship-admin/${scholarship._id}`}><button className="btn bg-[#0AB99D] text-white">Edit</button></Link></td>
                <td><button className="btn bg-red-500 text-2xl text-white" onClick={()=>handleDeleteScholarship(scholarship._id)}><MdDelete/></button>  </td>
              </tr>)
        }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageScholarshipAdmin;