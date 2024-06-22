import React, { useEffect, useState } from 'react';

const useTest = () => {
    const [appliedApplications,setAppliedApplications]=useState([])
    useEffect(()=>{
        fetch(`https://grant-genius-server.vercel.app/applied-scholarships`)
        .then(res=>{
            console.log(res.data)
            setAppliedApplications(res.data)
        })
    },[])
    console.log(appliedApplications)
    return appliedApplications
};

export default useTest;