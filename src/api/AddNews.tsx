import { News } from "../types/News";
import { API } from "./ConnectionData";
import axios from "axios";

export async function AddNews({ title, description, date }:News){
  try {
    const response = await axios.post(`${API}/add_news`, {
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