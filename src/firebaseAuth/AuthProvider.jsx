import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const axiosPublic =useAxiosPublic()
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const googleProvider = new GoogleAuthProvider()
    const registerUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logoutUser =()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUser =(name,photoUrl)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
          })
    }
    const googleLoginUser =()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo = {email: currentUser?.email}
                axiosPublic.post('/jwt',userInfo)
                .then(result=>{
                    if(result.data.token){
                        localStorage.setItem('token-org',result.data.token)
                    }
                    else{
                        localStorage.removeItem('token-org')
                        
                    }
                })
                
            }
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[axiosPublic])
    const authInfo={
        user,loading,registerUser,loginUser,logoutUser,updateUser,setUser,googleLoginUser
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;