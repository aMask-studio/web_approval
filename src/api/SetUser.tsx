import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    user: number,
    mail: string,
    address: number,
    name: string,
}

export async function SetUser({ user, mail, address, name }:Props){
  try {
    const response = await axios.post(`${API}/set_user`, {
        user,
        mail,
        address,
        name
    }, {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
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