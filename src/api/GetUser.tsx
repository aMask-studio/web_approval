import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    id: number
}

export async function GetUser({ id }:Props){
  try {
    const response = await axios.post(`${API}/get_user`, {
        id,
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