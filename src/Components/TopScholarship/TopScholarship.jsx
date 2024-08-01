import { Link } from "react-router-dom";
import useScholarship from "../../Hooks/useScholarship";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TopScholarship = () => {
  //const [scholarshipData]=useScholarship()
  const [scholarshipData, setScholarshipData] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axiosPublic.get(`/all-scholarships`).then((res) => {
      //console.log(res.data);
      setScholarshipData(res.data);
    });
  }, [axiosPublic]);
  useEffect(() => {
    axiosPublic.get("/all-reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiosPublic]);
  const calculateAverageRating = (scholarshipId, reviews) => {
    const relevantReviews = reviews.filter(
      (review) => review.scholarshipId === scholarshipId
    );
    const totalRatings = relevantReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const scholarshipWithAvgRating = relevantReviews.length
      ? (totalRatings / relevantReviews.length).toFixed(3)
      : 0;
    return scholarshipWithAvgRating;
  };
  const scholarshipsWithRatings = scholarshipData.map((scholarship) => {
    const averageRating = calculateAverageRating(
      scholarship.scholarshipId,
      reviews
    );
    return {
      ...scholarship,
      averageRating: averageRating,
    };
  });
  //console.log(scholarshipsWithRatings)
  //console.log(scholarshipData);
  return (
    <div>
      <h2 className="mb-2 text-3xl md:text-5xl text-center">Top Scholarship</h2>
      <h2 className="mb-6 text-center">
        Discover amazing opportunities to take your life to another level
      </h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {scholarshipsWithRatings?.slice(0, 6).map((singleScholarship) => (
          <div
            key={singleScholarship._id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-80 relative h-52"
                src={singleScholarship.universityLogo}
                alt="Shoes"
              />
            </figure>
            <p className="bg-[#0AB99D] absolute top-10 left-12 text-white px-4 py-2 rounded-md">
              {singleScholarship.scholarshipCategory}
            </p>
            <div className="space-y-2">
              <h2>rating</h2>
              <h2 className="card-title">{singleScholarship.universityName}</h2>
              <h2 className="text-left">
                <span className="text-[16px] font-bold">Subject : </span>
                {singleScholarship.subjectName}
              </h2>
              <p className="flex items-center">
                <FaLocationDot className="text-2xl mr-1 text-[#0AB99D]" />
                {singleScholarship.universityLocation.city},
                {singleScholarship.universityLocation.country}
              </p>
              <p>
                <h2 className="text-left">
                  <span className="font-bold">Rating :</span>{" "}
                  {singleScholarship.averageRating}{" "}
                </h2>
              </p>
              <div className="text-left gap-6">
                <p>
                  <span className="font-bold">Application fees:</span>{" "}
                  {singleScholarship.applicationFees} $
                </p>
                <p>
                  <span className="font-bold">Application Deadline: </span>
                  {singleScholarship.applicationDeadline}
                </p>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/scholarship/${singleScholarship.scholarshipId}`}>
                  <button className="btn bg-[#0AB99D] text-white">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/all-scholarship">
        <button className="btn bg-[#0AB99D] mt-6 text-white">
          See all Scholarship
        </button>
      </Link>
    </div>
  );
};

export default TopScholarship;
