import { Appeal } from "../types/Appeal";
import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    title: string,
    description: string,
    user: number,
}

export async function AddAppeal({ title, description, user }:Props){
  try {
    const response = await axios.post(`${API}/add_appeal`, {
        title,
        description,
        user
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