import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';

const axiosSecure =axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const {logoutUser}=useAuth()
    const navigate =useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token-org')
        config.headers.authorization=`Bearer ${token}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
      axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, async(error)=> {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status =error.response.status
        if(status ===401 || status === 403){
          await logoutUser()
          .then(()=>{navigate('/')})
        }
        return Promise.reject(error);
      });
    return axiosSecure
};

export default useAxiosSecure;