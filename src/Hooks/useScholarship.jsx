import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from './useAxiosPublic';

const useScholarship = () => {
    const axiosPublic = useAxiosPublic()
    const {data:scholarshipData}=useQuery({
        queryKey: ['scholarshipData'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/all-scholarship')
            //console.log(res.data)
            return res.data
        }
    })
    return [scholarshipData]
}

export default useScholarship;