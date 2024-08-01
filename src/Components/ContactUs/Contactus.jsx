import React from "react";
import {
  FaClock,
  FaLocationArrow,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

const Contactus = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-5xl">Contact Us</h2>
      <div className="flex gap-6 flex-col md:flex-row rounded-3xl bg-[#F2F2F2] p-8 my-4">
        <div className="space-y-6 md:w-1/2">
          <h2 className="text-xl font-bold md:text-3xl text-left">Get In Touch</h2>
          <p className="text-left">
            Here's how you can contact us <br />
            So that you can get the best service according to your need.
          </p>
          <div className="bg-white p-6 space-y-4 rounded-2xl">
            <div className="flex gap-4">
              <FaLocationDot className="text-5xl text-[#0AB99D] bg-[#0AB99D1A] p-3 rounded-full" />
              <div>
                <h2 className="text-left">Our Address</h2>
                <h2 className="text-left md:text-xl font-bold">
                  1234 Elm Street <br />
                  Springfield, IL 62701
                </h2>
              </div>
            </div>
            <div className="flex gap-4">
              <FaClock className="text-5xl text-[#0AB99D] bg-[#0AB99D1A] p-3 rounded-full" />
              <div>
                <h2 className="text-left">Hours Of Operation</h2>
                <h2 className="text-left md:text-xl font-bold">
                  Mon - Fri: 9.00am to 5.00pm
                </h2>
                <h2 className="text-left text-[16px]">[2nd Sat Holiday]</h2>
              </div>
            </div>
            <div className="flex overflow-clip gap-4">
              <FaPhone className="text-5xl text-[#0AB99D] bg-[#0AB99D1A] p-3 rounded-full" />
              <div>
                <h2 className="text-left">Contact</h2>
                <h2 className="text-left md:text-xl font-bold">
                  +99- 35895-4565 <br />
                  supportyou@info.com
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className=" w-full max-w-sm">
            <form className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered border border-[#0AB99D]"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered border border-[#0AB99D]"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Phone</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered border border-[#0AB99D]"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="subject"
                  className="input input-bordered border border-[#0AB99D]"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Message</span>
                </label>
                <input
                  type="text"
                  placeholder="Message"
                  className="input input-bordered border border-[#0AB99D]"
                  required
                />
              </div>
              
              <div className="form-control mt-6">
                <button className="btn bg-[#0AB99D] text-white">Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
