import { API } from "./ConnectionData";
import axios from "axios";

export async function GetPatternProblems(){
  try {
    const response = await axios.post(`${API}/get_pattern_problems`);
    if (!response.status) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const result = response.data;
    return result;
  } catch (err) {
    console.error(err);
  }
}