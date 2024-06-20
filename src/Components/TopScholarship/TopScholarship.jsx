import { Link } from "react-router-dom";
import useScholarship from "../../Hooks/useScholarship";
import { FaLocationDot } from "react-icons/fa6";


const TopScholarship = () => {
    const [scholarshipData]=useScholarship()
    //console.log(scholarshipData)
    return (
        <div>
            <h2 className="mb-2 text-5xl text-center">Top Scholarship</h2>
            <h2 className="mb-6 text-center">Discover amazing opportunities to take your life to another level</h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    scholarshipData?.slice(0,6).map(singleScholarship=><div key={singleScholarship._id} className="card w-96 bg-base-100 shadow-xl">
                    <figure><img className="w-80 relative h-52" src={singleScholarship.universityLogo} alt="Shoes" /></figure>
                    <p className="bg-[#0AB99D] absolute top-10 left-12 text-white px-4 py-2 rounded-md">{singleScholarship.scholarshipCategory}</p>
                    <div className="space-y-2">
                        <h2>rating</h2>
                      <h2 className="card-title">{singleScholarship.universityName}</h2>
                      <h2 className="text-left"><span className="text-[16px] font-bold">Subject : </span>{singleScholarship.subjectName}</h2>
                      <p className="flex items-center"><FaLocationDot className="text-2xl mr-1 text-[#0AB99D]"/>{singleScholarship.universityLocation.city},{singleScholarship.universityLocation.country}</p>
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
            <Link to='/all-scholarship'><button className="btn bg-[#0AB99D] mt-6 text-white">See all Scholarship</button></Link>
        </div>
    );
};

export default TopScholarship;