import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const GoogleLogin = () => {
    const {googleLoginUser}=useAuth()
    const axiosPublic =useAxiosPublic()
    const navigate =useNavigate()
    const handleGoogleLogin =()=>{
        googleLoginUser()
        .then(result=>{
            console.log(result.user)
            const userInfo={
                name: result.user.displayName,
                email: result.user.email,
                role: 'user'
            }
            axiosPublic.post('/user',userInfo)
            .then(()=>{
                toast.success('account created')
                navigate('/')
            })
        })
    }
    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn bg-[#0AB99D] text-white">Google</button>
        </div>
    );
};

export default GoogleLogin;