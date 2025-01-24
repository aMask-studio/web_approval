import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    limit: number
}

export async function GetNews({ limit }:Props){
  try {
    const response = await axios.post(`${API}/get_news`, {
        limit,
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