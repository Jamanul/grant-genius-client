import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';

const ModeratorHome = () => {
    const {user}=useAuth()
    const [showUser,setShowUser]=useState([])
    const axiosSecure =useAxiosSecure()
    useEffect(()=>{
        axiosSecure.get(`/user-moderator?email=${user?.email}`)
        .then(res=>{//console.log(res.data)
            setShowUser(res.data)
        })
    },[axiosSecure, user?.email])
    return (
        <div className='border rounded-3xl flex gap-4 border-[#0AB99D] p-4'>
        <img src={user.photoURL} className='rounded-full w-80' alt="" />
       <div>
       <h2 className='text-2xl'>User Name: {showUser[0]?.name}</h2>
       <h2 className='text-2xl'>Email : {showUser[0]?.email} </h2>
       <h2 className='text-2xl'>Role : {showUser[0]?.role} </h2>
       </div>
    </div>
    );
};

export default ModeratorHome;