import React from 'react';
import useAxiosSecure from './useAxiosSecure/useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useModerator = () => {
    const axiosSecure =useAxiosSecure()
    const {user,loading}= useAuth()
    const {data:isModerator,isPending:isModeratorLoading}=useQuery({
        queryKey: ['isModerator'],
        enabled: !!user?.email && !loading,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/user/moderator/${user?.email}`)
            //console.log(res.data)
            return res.data.moderator
        }
    })
    return [isModerator,isModeratorLoading]
};

export default useModerator;