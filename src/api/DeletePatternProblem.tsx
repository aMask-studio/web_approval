import { News } from "../types/News";
import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    id: number,
}

export async function DeletePatternProblem({ id }:Props){
  try {
    const response = await axios.post(`${API}/delete_pattern_problem`, {
        id
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