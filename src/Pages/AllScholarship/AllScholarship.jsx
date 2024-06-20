import { FaLocationDot } from "react-icons/fa6";
import useScholarship from "../../Hooks/useScholarship";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const AllScholarship = () => {
    const [scholarshipData]=useScholarship()
    const [reviews,setReviews]=useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
      axiosPublic.get("/all-reviews").then((res) => {
        setReviews(res.data);
      });
    }, [axiosPublic]);
    const calculateAverageRating = (scholarshipId, reviews) => {
      const relevantReviews = reviews.filter(review => review.scholarshipId === scholarshipId);
      const totalRatings = relevantReviews.reduce((sum, review) => sum + review.rating, 0);
      const scholarshipWithAvgRating = relevantReviews.length ? (totalRatings / relevantReviews.length).toFixed(3) : 0;
      return scholarshipWithAvgRating;
    };
    const scholarshipsWithRatings = scholarshipData.map(scholarship => {
      const averageRating = calculateAverageRating(scholarship.scholarshipId, reviews);
      return {
        ...scholarship,
        averageRating: averageRating
      };
    });
    //console.log(scholarshipsWithRatings)
    // const handleRating =(id)=>{
    //   const test=reviews.filter(review=>review.scholarshipId===id)
    //   console.log(test)
    //   const totalRating= test.reduce((sum,review)=>sum+review.rating,0)
    //   const avgRating = totalRating/test.length
    //   console.log(avgRating)
    // }
   
    return (
        <div>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    scholarshipsWithRatings?.map(singleScholarship=><div key={singleScholarship._id} className="card w-96 bg-base-100 shadow-xl">
                    <figure><img className="w-80 relative h-52" src={singleScholarship.universityLogo} alt="Shoes" /></figure>
                    <p className="bg-[#0AB99D] absolute top-10 left-12 text-white px-4 py-2 rounded-md">{singleScholarship.scholarshipCategory}</p>
                    <div className="space-y-2">
                      <h2 className="card-title text-left">{singleScholarship.universityName}</h2>
                      <h2 className="text-left"><span className="text-[16px] font-bold">Subject : </span>{singleScholarship.subjectName}</h2>
                      <p className="flex"><FaLocationDot className="text-2xl mr-1 text-[#0AB99D]"/>{singleScholarship.universityLocation.city},{singleScholarship.universityLocation.country}</p>
                      <p><h2 className="text-left"><span className="font-bold">Rating :</span> {singleScholarship.averageRating} </h2></p>
                      <div className="text-left gap-6">
                        <p><span className="font-bold">Application fees:</span> {singleScholarship.applicationFees} $</p>
                        <p><span className="font-bold">Application Deadline: </span>{singleScholarship.applicationDeadline}</p>
                      </div>
                      <div className="card-actions justify-end">
                        <Link to={`/scholarship/${singleScholarship.scholarshipId}`}><button className="btn bg-[#0AB99D] text-white">Details</button></Link>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default AllScholarship;