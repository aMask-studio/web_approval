import axios from "axios";
import { FC, useEffect, useState } from "react";
import { API } from "../api/ConnectionData";
import { TokenStatus } from "../types/TokenStatus";

interface Props {
    exitToLogin: boolean,
    isAdmin: boolean,
}

const useAuthenticateToken = ({ exitToLogin, isAdmin }: Props) => {
    const [tokenStatus, setToken] = useState<TokenStatus | undefined>();
    var token = isAdmin ? localStorage.getItem('accessTokenAdmin') : localStorage.getItem('accessToken');

    useEffect(()=> {
        const fetchData = async () => {
            const response = await axios.get(`${API}/protected`,{headers:{Authorization:`Bearer ${token}`}});

            switch(response.status){
                case 401:
                    if(exitToLogin){
                        if(window.location.href.includes("admin")){
                            window.open("/admin/login");   
                        } else {
                            window.open("/login");   
                        }
                    }
                    setToken(TokenStatus.None);
                    break;
                case 403:
                    alert(1);
                    if(exitToLogin){
                        if(window.location.href.includes("admin")){
                            window.open("/admin/login");   
                        } else {
                            window.open("/login");   
                        }
                    }
                    setToken(TokenStatus.Error);
                    break;
                default:
                    setToken(TokenStatus.Ok);
                    break;
            }
        }

        if(!tokenStatus){
            fetchData().catch(console.error);
        }
    });
    if(tokenStatus){
        //alert(tokenStatus);
        return tokenStatus;
    }
}
export default useAuthenticateToken;