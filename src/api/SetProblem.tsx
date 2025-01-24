import { Address } from "../types/Address";
import { PatternProblem } from "../types/PatternProblem";
import { Problem } from "../types/Problem";
import { API } from "./ConnectionData";
import axios from "axios";

export async function SetProblem({ id, PatternProblem, Address, startDate, endDate }:Problem){
  try {
    const problemId = PatternProblem.id;
    const addresses = Address.map((elem)=>{return elem.address_id});
    // console.log(addresses);
    // alert(addresses);
    // alert(startDate);
    const response = await axios.post(`${API}/set_problem`, {
        id,
        problemId,
        addresses,
        startDate,
        endDate,
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