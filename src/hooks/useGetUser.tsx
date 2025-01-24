import { User } from "../types/User";
import { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import useAuthenticateToken from "./useAuthenticateToken";
import { GetUser } from "../api/GetUser";

interface Props {
    exitToLogin: boolean,
    loadUser: boolean,
}

const useGetUser = ({ exitToLogin, loadUser }:Props) => {
    const tokenStatus = useAuthenticateToken({exitToLogin:exitToLogin, isAdmin: false});
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        if(!loadUser){
            if(tokenStatus == 1){
                const token = localStorage.getItem('accessToken');
                if (token) {
                  const decodedToken = jwtDecode<User>(token);
                  setUserData(decodedToken);
                }
            }
        } else {
            if(tokenStatus == 1){
                const token = localStorage.getItem('accessToken');
                if(token){
                    GetUser({id:jwtDecode<User>(token).id}).then((res)=>{
                        if(res){
                            const { accessToken } = res;
                            const decodedToken = jwtDecode<User>(accessToken);
                            localStorage.setItem('accessToken', accessToken);
                            setUserData(decodedToken);
                        }
                    });
                }
            }
        }
    }, [tokenStatus]);
  
    if(tokenStatus && userData) {
        return userData;
    }
}
export default useGetUser;