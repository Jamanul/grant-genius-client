import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-[420px]" src='https://i.ibb.co/VmkDRjC/3-A5sn-U7-YV.jpg'></img>
        </div>
        <div className="card shrink-0 w-full max-w-sm border-[#0AB99D] border">
        <h1 className="text-5xl font-bold">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
                className="input border-[#0AB99D]"
                required
              />
              {errors.name && (
                <p className="text-red-500">Please enter your name.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoUrl</span>
              </label>
              <input
                {...register("photoUrl", { required: true })}
                type="text"
                placeholder="photoUrl"
                className="input border-[#0AB99D]"
                required
              />
              {errors.photoUrl && (
                <p className="text-red-500">Please enter your photoUrl.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input border-[#0AB99D]"
                required
              />
              {errors.email && (
                <p className="text-red-500">Please enter your email address.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                  {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{6}/})}
                  type="password"
                  placeholder="password"
                  className="input border-[#0AB99D]"
                  required
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    password must be 6 characters long
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    password must contain one special character and one capital letter
                  </span>
                )}
            
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#0AB99D] text-white">Register</button>
            </div>
          </form>
          <p>Already have an account? <Link className='font-bold' to='/login'>  Login here!!!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
