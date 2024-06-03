import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";


export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
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
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    const authInfo={
        user,loading,registerUser,loginUser,logoutUser,updateUser
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;