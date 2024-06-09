import React, { useEffect, useState } from 'react';

const useTest = () => {
    const [appliedApplications,setAppliedApplications]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/applied-scholarships`)
        .then(res=>{
            console.log(res.data)
            setAppliedApplications(res.data)
        })
    },[])
    console.log(appliedApplications)
    return appliedApplications
};

export default useTest;