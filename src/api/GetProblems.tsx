import { API } from "./ConnectionData";
import { Problem } from "../types/Problem";
import axios from "axios";

interface Props {
    limit?: number,
    addressId?: number,
    id?: number,
}

export async function GetProblems({ limit, addressId, id }:Props){
  try {
    const response = await axios.post(`${API}/get_problems`, {
        limit,
        addressId,
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