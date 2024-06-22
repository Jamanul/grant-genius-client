import React from 'react';
import useModerator from '../Hooks/useModerator';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ModeratorRoute = ({children}) => {

    const [isModerator,isModeratorLoading]=useModerator()
    const {user,loading}=useAuth()
    if(loading || isModeratorLoading){
       return <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-[#0AB99D] loading-lg"></span>
      </div>
    }
    if (user && isModerator){
        return children
       }
       return <Navigate state={location?.pathname} to="/login" ></Navigate>
};

export default ModeratorRoute;