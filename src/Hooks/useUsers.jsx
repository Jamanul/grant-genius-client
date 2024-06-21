import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure/useAxiosSecure';

const useUsers = () => {
    const {loading} = useAuth()
    const [filteredUsers,setFilteredUsers]=useState([])
    //const axiosPublic = useAxiosPublic()
    const axiosSecure =useAxiosSecure()
      const { refetch,data: users } = useQuery({
    queryKey: ["users"],
    enabled: !loading && !!localStorage.getItem('token-org'),
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      //console.log(res.data)
      setFilteredUsers(res.data)
      return res.data;
    },
  });
  
    return [refetch,users,filteredUsers,setFilteredUsers]
};

export default useUsers;