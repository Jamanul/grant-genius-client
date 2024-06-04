import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const {user,logoutUser}=useAuth()
  const handleLogout =()=>{
    logoutUser()
    .then(()=>{
      toast.success('Logged out successfully')
    })
  }
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
      <NavLink to="/all-scholarship">All Scholarship</NavLink>
      </li>
      <li>
      <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
      
        <Link to="/" className="">
        <img
          className="w-14 rounded-full"
          src="https://i.ibb.co/c6vDhfL/e48c686c-18d6-49be-b72c-6eb91813ab49.jpg"
          alt=""
        />
        </Link>
        <Link to="/" className="btn btn-ghost text-xl">
          Grant Genius
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                {user ? user?.displayName : 'Your name'}
              </a>
            </li>
            <li>
              {
                user ? <a onClick={handleLogout}>Logout</a> : <Link to='/login'>Login</Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
