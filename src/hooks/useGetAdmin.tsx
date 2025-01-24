import { User } from "../types/User";
import { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import useAuthenticateToken from "./useAuthenticateToken";
import { GetUser } from "../api/GetUser";
import { Admin } from "../types/Admin";

const useGetAdmin = () => {
    const tokenStatus = useAuthenticateToken({exitToLogin:true, isAdmin: true});
    const [adminData, setAdminData] = useState<Admin | null>(null);

    useEffect(() => {
        if(tokenStatus == 1){
            const token = localStorage.getItem('accessTokenAdmin');
            if (token) {
              const decodedToken = jwtDecode<Admin>(token);
              setAdminData(decodedToken);
            }
        }
        // if(!loadAdmin){
        //     if(tokenStatus == 1){
        //         const token = localStorage.getItem('accessTokenAdmin');
        //         if (token) {
        //           const decodedToken = jwtDecode<Admin>(token);
        //           setAdminData(decodedToken);
        //         }
        //     }
        // } else {
        //     const token = localStorage.getItem('accessTokenAdmin');
        //     if(token){
        //         GetUser({id:jwtDecode<Admin>(token).id}).then((res)=>{
        //             if(res){
        //                 const { accessToken } = res;
        //                 const decodedToken = jwtDecode<Admin>(accessToken);
        //                 localStorage.setItem('accessTokenAdmin', accessToken);
        //                 setAdminData(decodedToken);
        //             }
        //         });
        //     }
        // }
    }, [tokenStatus]);
  
    if(tokenStatus && adminData) {
        return adminData;
    }
}
export default useGetAdmin;