import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
const Login = () => {
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
          <h1 className="text-5xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                    {...register("password", { required: true})}
                    type="password"
                    placeholder="password"
                    className="input border-[#0AB99D]"
                    required
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-500">This field is required</span>
                  )}
              </div>
              <div className="form-control mt-6">
                <button className="btn  bg-[#0AB99D] text-white">Log In</button>
              </div>
            </form>
            <p>Don't have an account? <Link className='font-bold' to='/registration'>  Register here!!!</Link></p>
          </div>
        </div>
      </div>
    );
};

export default Login;