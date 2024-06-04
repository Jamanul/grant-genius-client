import { FaLocationDot } from "react-icons/fa6";
import useScholarship from "../../Hooks/useScholarship";
import { Link } from "react-router-dom";


const AllScholarship = () => {
    const [scholarshipData]=useScholarship()
    return (
        <div>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    scholarshipData?.map(singleScholarship=><div key={singleScholarship._id} className="card w-96 bg-base-100 shadow-xl">
                    <figure><img className="w-80 relative h-52" src={singleScholarship.universityLogo} alt="Shoes" /></figure>
                    <p className="bg-[#0AB99D] absolute top-10 left-12 text-white px-4 py-2 rounded-md">{singleScholarship.scholarshipCategory}</p>
                    <div className="space-y-2">
                        <h2>rating</h2>
                      <h2 className="card-title text-left">{singleScholarship.universityName}</h2>
                      <h2 className="text-left"><span className="text-[16px] font-bold">Subject : </span>{singleScholarship.subjectName}</h2>
                      <p className="flex"><FaLocationDot className="text-2xl mr-1 text-[#0AB99D]"/>{singleScholarship.universityLocation.city},{singleScholarship.universityLocation.country}</p>
                      <div className="text-left gap-6">
                        <p><span className="font-bold">Application fees:</span> {singleScholarship.applicationFees} $</p>
                        <p><span className="font-bold">Application Deadline: </span>{singleScholarship.applicationDeadline}</p>
                      </div>
                      <div className="card-actions justify-end">
                        <Link to={`/scholarship/${singleScholarship._id}`}><button className="btn bg-[#0AB99D] text-white">Details</button></Link>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default AllScholarship;