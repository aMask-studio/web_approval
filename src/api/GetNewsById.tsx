import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    id: number
}

export async function GetNewsById({ id }:Props){
  try {
    const response = await axios.get(`${API}/get_news_by_id?id=${id}`);

    if (!response.status) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const result = response.data;
    return result;
  } catch (err) {
    console.error(err);
  }
}