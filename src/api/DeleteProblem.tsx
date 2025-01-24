import { Appeal } from "../types/Appeal";
import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    id: number,
}

export async function DeleteProblem({ id }:Props){
  try {
    const response = await axios.post(`${API}/delete_problem`, {
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