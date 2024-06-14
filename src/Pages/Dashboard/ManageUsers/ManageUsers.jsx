import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUsers from "../../../Hooks/useUsers";
import useAdmin from "../../../Hooks/useAdmin";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ManageUsers = () => {
  // const [isAdmin,] = useAdmin()
  //const axiosSecure = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const [refetch,users] =useUsers()
  // const [users,setUsers]=useState([])
  // useEffect(()=>{
  //   axiosSecure.get("/users")
  //   .then(res=>{
  //     setUsers(res.data)
  //   })
  // },[axiosSecure])
  //console.log(users)
  const handleDeleteUser =(id)=>{
      axiosSecure.delete(`/user/${id}`)
      .then(res=>{
        if(res.data.deletedCount>0){
          toast.success('deleted a user')
          refetch()
        }
        //console.log(res.data)
        
      })
  }
  const handleUser = (userDetails,id) => {
    //console.log(userDetails,id);
    if(userDetails==='moderator'){
        axiosSecure.patch(`/user-role/${id}`,{role: 'moderator'})
        .then(res=>{
            //console.log(res.data)
            if(res.data.acknowledged){
            
                 refetch()
            }
        })
    }
    if(userDetails==='user'){
        axiosSecure.patch(`/user-role/${id}`,{role: 'user'})
        .then(res=>{
            //console.log(res.data)
            if(res.data.acknowledged){
                 refetch()
            }
        })
    }
    if(userDetails==='admin'){
        axiosSecure.patch(`/user-role/${id}`,{role: 'admin'})
        .then(res=>{
            //console.log(res.data)
            if(res.data.acknowledged){
                refetch()
            }
        })
    }
  };
  return (
    <div>
      <h2 className="text-4xl">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <details className="dropdown">
                    <summary className="m-1 btn">{user.role}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36">
                      <li>
                       <button onClick={()=>handleUser('user',user._id)}>User</button>
                      </li>
                      <li>
                       <button onClick={()=>handleUser('moderator',user._id)}>Moderator</button>
                      </li>
                      <li>
                       <button onClick={()=>handleUser('admin',user._id)}>Admin</button>
                      </li>
                    </ul>
                  </details>
                </td>
                <td> 
                  <button className="btn bg-red-500 text-2xl text-white" onClick={()=>handleDeleteUser(user._id)}><MdDelete/></button>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
