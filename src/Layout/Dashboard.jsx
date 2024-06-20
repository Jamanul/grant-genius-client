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
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  //  console.log(isAdmin)
  //  console.log(isModerator,'mod')
  return (
    <div className="flex gap-6">
      <div className="w-80 text-left p-4 space-y-2 text-white min-h-screen bg-[#0AB99D]">
        {isAdmin && !isModerator ? (
          <>
            <Link
              to="/dashboard/admin-dashboard"
              className="text-xl flex items-center gap-2"
            >
              <FaUser />
              My Profile
            </Link>
            <Link
              to="/dashboard/users"
              className="text-xl flex items-center gap-2"
            >
              <FaUser></FaUser>
              Manage Users
            </Link>
          </>
        ) : !isAdmin && isModerator ? (
          <>
            <Link
              to="/dashboard/moderator-dashboard"
              className="text-xl flex items-center gap-2"
            >
              
              My Profile
            </Link>
            <Link
              to="manage-scholarship"
              className="text-xl flex items-center gap-2"
            >
              Manage Scholarship
            </Link>
            <Link
              to="add-scholarship"
              className="text-xl flex items-center gap-2"
            >
              Add Scholarship
            </Link>
            <Link
              to="manage-applied-scholarship"
              className="text-xl flex items-center gap-2"
            >
              Manage Applied Scholarship
            </Link>
            <Link to="all-reviews" className="text-xl flex items-center gap-2">
              All Reviews
            </Link>
          </>
        ) : (
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
