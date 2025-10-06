"use client"

import axiosService from "@/helpers/axios";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function useUserActions(){
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter(); 
    
    // Login the User 
    function login(data){
        return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
            // Registering the Account and Tokens in the store 
            setUserData(res);
            router.replace("/dashboard")
        })
    }
    function logout(){
        localStorage.removeItem("auth");
        router.replace("/login")
    }
    
    // Get the user 
    function getUser(){
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.user;  
    }

    // Get the Access Token 
    function getAccessToken(){
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.access;  
    }

    // Get the Refresh Token 
    function getRefreshToken(){
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.refresh;
    }

    // Set the Access, token and user property 
    function setUserData(res){
        localStorage.setItem(
            "auth",
            JSON.stringify({
                access: res.data.access, 
                refresh: res.data.refresh, 
                user: res.data.user, 
            })
        );
    }

    // Edit the user 
    function edit(data, userId){
        return axiosService.patch(`${baseURL}/user/${userId}/`, data, {
            headers: {
                // Explicitly let the browser set Content Type {including boundary}
                'Content-Type': undefined,
            }
        }).then((res) => {
            // Registering the account in the store 
            localStorage.setItem("auth", JSON.stringify({
                access: getAccessToken(), 
                refresh: getRefreshToken(),
                user: res.data, 
            }));
    });
    }
    return {
        login, 
        logout, 
        getUser, 
        getAccessToken,
        getRefreshToken,
        edit,
    };
}

