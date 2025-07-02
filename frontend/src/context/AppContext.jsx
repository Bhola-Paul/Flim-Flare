import axios from "axios";
axios.defaults.withCredentials = true;
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContent=createContext();

export const AppContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setIsLoggedin]=useState(false);
    const [userData,setUserData]=useState(false);

    const getAuthState = async () => {
        try {
            const {data}= await axios.post(backendUrl+'/api/user/check-login');
            if(data.success){
                setIsLoggedin(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const getUserData=async () => {
        try {
            const {data} = await axios.post(backendUrl+'/api/user/get-user-data');
            if(data.success){
                setUserData(data.userData);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getAuthState();
    },[]);

    const value={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData,
        loading,
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}
