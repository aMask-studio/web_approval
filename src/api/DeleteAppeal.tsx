import { Appeal } from "../types/Appeal";
import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    id: number,
}

export async function DeleteAppeal({ id }:Props){
  try {
    const accessToken = !window.location.href.includes("/admin") ? localStorage.getItem('accessToken') : localStorage.getItem('accessTokenAdmin');
    const response = await axios.post(`${API}/delete_appeal`, {
        id
    }, {
        headers: { 
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!response.status) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const result = response.data;
    return result;
  } catch (err) {
    console.error(err);
  }
}