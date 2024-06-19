import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useScholarship = () => {
    const {loading}=useAuth()
    const axiosPublic = useAxiosPublic()
    const {data:scholarshipData,refetch}=useQuery({
        queryKey: ['scholarshipData'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/all-scholarship')
            //console.log(res.data)
            return res.data
        }
    })
    return [scholarshipData,refetch]
}

export default useScholarship;