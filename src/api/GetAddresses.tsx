import { API } from "./ConnectionData";
import axios from "axios";

export async function GetAddresses(){
  try {
    const response = await axios.get(`${API}/get_addresses`);
    if (!response.status) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const result = response.data;
    return result;
  } catch (err) {
    console.error(err);
  }
}