import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    user?: number,
    limit?: number,
    filterAnswered?: boolean,
}

export async function GetAppeals({ user, limit, filterAnswered }:Props){
  try {
    const response = await axios.post(`${API}/get_appeals`, {
        user,
        limit,
        filterAnswered
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