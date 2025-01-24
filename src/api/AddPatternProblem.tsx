import { News } from "../types/News";
import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    name: string,
}

export async function AddPatternProblem({ name }:Props){
  try {
    const response = await axios.post(`${API}/add_pattern_problem`, {
        name
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