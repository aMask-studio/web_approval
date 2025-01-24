import { Appeal } from "../types/Appeal";
import { API } from "./ConnectionData";
import axios from "axios";

interface Props {
    id: number,
    answer: string,
}

export async function AddAnswerToAppeal({ id, answer }:Props){
  try {
    const response = await axios.post(`${API}/add_answer_appeal`, {
        id,
        answer,
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