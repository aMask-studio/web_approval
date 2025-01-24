import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    id: number,
    title: string,
    description: string,
    date: Date,
}

export async function SetNews({ id, title, description, date }:Props){
  try {
    const response = await axios.post(`${API}/set_news`, {
        id,
        title,
        description,
        date
    }, {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('accessTokenAdmin')}`
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