import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
    const {user}=useAuth()
    //console.log(user)
    return (
        <div className='border rounded-3xl flex gap-4 border-[#0AB99D] p-4'>
            <img src={user.photoURL} className='rounded-full w-80' alt="" />
           <div>
           <h2 className='text-2xl'>User Name: {user.displayName}</h2>
           <h2 className='text-2xl'>Email : {user.email} </h2>
           </div>
        </div>
    );
};

export default UserHome;