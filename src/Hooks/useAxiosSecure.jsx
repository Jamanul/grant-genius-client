import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});
const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async(error)=> {
    const status =error.response.status
    if(status ===401 || status === 403){
      await logoutUser()
      navigate('/')
    }
    return Promise.reject(error);
  });
  return axiosSecure;
};

export default useAxiosSecure;
