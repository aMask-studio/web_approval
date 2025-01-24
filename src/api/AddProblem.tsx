import { News } from "../types/News";
import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    problemId: number,
}

export async function AddProblem({ problemId }:Props){
  try {
    const response = await axios.post(`${API}/add_problem`, {
        problemId
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