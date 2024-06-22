import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading]=useAdmin()
    const {user,loading}=useAuth()
    if(loading || isAdminLoading){
       return <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-[#0AB99D] loading-lg"></span>
      </div>
    }
    if (user && isAdmin){
        return children
       }
       return <Navigate state={location?.pathname} to="/login" ></Navigate>
};

export default AdminRoute;