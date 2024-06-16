import { FaHouse, FaSchool, FaSchoolFlag, FaUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosSchool } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";

const Dashboard = () => {
  // const isAdmin = true;
  const [isAdmin,] = useAdmin()
  const [isModerator,]=useModerator()
   console.log(isAdmin)
  console.log(isModerator,'mod')
  return (
    <div className="flex gap-6">
      <div className="w-80 text-left p-4 space-y-2 text-white min-h-screen bg-[#0AB99D]">
        {isAdmin && !isModerator ? (
          <>
            <Link
             to='/dashboard/users'
             className="text-xl flex items-center gap-2"
            >
            <FaUser></FaUser>
            Manage Users
            </Link>
          </>
        ) : isModerator ? (<>
            <Link to='manage-scholarship'
             className="text-xl flex items-center gap-2"
            >
            Manage Scholarship
            </Link>
        
        </> ):(
          <>
            <Link
              to="/dashboard/user-dashboard"
              className="text-xl flex items-center gap-2"
            >
              <FaUser />
              My Profile
            </Link>
            <Link
              to="/dashboard/my-application"
              className="text-xl flex items-center gap-2"
            >
              <FaSchool />
              My Application
            </Link>
            <Link
              to="/dashboard/my-reviews"
              className="text-xl flex items-center gap-2"
            >
              <MdReviews />
              My review
            </Link>
          </>
        )}

        <div className="divider divider-error"></div>
        <Link to="/" className="text-xl flex items-center gap-2">
          <FaHouse />
          Home
        </Link>
        <Link to="/" className="text-xl flex items-center gap-2">
          <IoIosSchool />
          All scholarship
        </Link>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;
