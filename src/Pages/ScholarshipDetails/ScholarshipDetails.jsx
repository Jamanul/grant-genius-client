
import { Link, useLoaderData, useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ReviewSlider from "../../Components/ReviewSlider/ReviewSlider";
const ScholarshipDetails = () => {
    const axiosPublic =useAxiosPublic()
    const [newScholarshipData,setNewScholarshipData]=useState([])
    const [reviews,setReviews]=useState([])
    //console.log(reviews)
    const {id}=useParams()
    //console.log(id)
    useEffect(()=>{
        axiosPublic.get(`https://grant-genius-server.vercel.app/all-scholarship/${id}`)
        .then(res=>{
            //console.log(res.data)
            setNewScholarshipData(res.data)
        })
    },[axiosPublic,id])
    const { _id,
        universityName,
        universityLogo,
        scholarshipCategory,
        universityLocation,
        applicationDeadline,
        subjectName,
        scholarshipDescription,
        stipend,
        postDate,
        serviceCharge,
        scholarshipId,
        applicationFees}=newScholarshipData
        //console.log(scholarshipId)
        useEffect(()=>{
            if(scholarshipId){
                axiosPublic.get(`/reviews?scholarshipId=${scholarshipId}`)
            .then(res=>{
                //console.log(res.data)
                setReviews(res.data)
            })
            }
            
        },[axiosPublic, scholarshipId])
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-6">
                <img className="rounded-3xl border border-[#0AB99D] p-4" src={universityLogo} alt="" />
                <div className="border space-y-2 flex-1 text-left border-[#0AB99D] p-4 rounded-3xl">
                    <h2 className="text-xl"><span className="font-bold text-2xl">Name : </span>{universityName}</h2>
                    <p className="flex items-center"><FaLocationDot className="text-2xl mr-1 text-[#0AB99D]"/>{universityLocation?.city},{universityLocation?.country}</p>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Scholarship category : </span>{scholarshipCategory}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Subject : </span>{subjectName}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">About : </span>{scholarshipDescription}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Post Date : </span>{postDate}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Application deadLine : </span>{applicationDeadline}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Stipend : </span>{stipend} $</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Service Charge : </span>{serviceCharge} $</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Application Fees: </span>{applicationFees} $ per year</h2>
                    <Link to={`/payment/${scholarshipId}`}><button className="btn bg-[#0AB99D] text-white">Apply Scholarship</button></Link>
                </div>
            </div>
            <ReviewSlider reviews={reviews}></ReviewSlider>
        </div>
    );
};

export default ScholarshipDetails;