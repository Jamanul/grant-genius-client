import React from 'react';
import useAxiosSecure from './useAxiosSecure/useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const {user,loading}= useAuth()
    const {data: isAdmin,isPending:isAdminLoading}= useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled: !!user?.email && !loading,
        queryFn : async()=>{
           const res=await axiosSecure.get(`/user/admin/${user.email}`)
           //console.log(res.data)
           return res.data.admin
        }
       })
       return [isAdmin,isAdminLoading]
    };
   

export default useAdmin;