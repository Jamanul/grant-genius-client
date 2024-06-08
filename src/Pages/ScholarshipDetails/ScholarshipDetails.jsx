
import { Link, useLoaderData, useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";



const ScholarshipDetails = () => {
    const newScholarshipData = useLoaderData()
    //console.log(newScholarshipData)
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
        applicationFees}=newScholarshipData
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-6">
                <img className="rounded-3xl border border-[#0AB99D] p-4" src={universityLogo} alt="" />
                <div className="border space-y-2 flex-1 text-left border-[#0AB99D] p-4 rounded-3xl">
                    <h2 className="text-xl"><span className="font-bold text-2xl">Name : </span>{universityName}</h2>
                    <p className="flex items-center"><FaLocationDot className="text-2xl mr-1 text-[#0AB99D]"/>{universityLocation.city},{universityLocation.country}</p>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Scholarship category : </span>{scholarshipCategory}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Subject : </span>{subjectName}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">About : </span>{scholarshipDescription}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Post Date : </span>{postDate}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Application deadLine : </span>{applicationDeadline}</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Stipend : </span>{stipend} $</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Service Charge : </span>{serviceCharge} $</h2>
                    <h2 className="text-xl"><span className="font-bold text-2xl">Application Fees: </span>{applicationFees} $ per year</h2>
                    <Link to={`/payment/${_id}`}><button className="btn bg-[#0AB99D] text-white">Apply Scholarship</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipDetails;