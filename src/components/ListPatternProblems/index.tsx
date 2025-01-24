import { FaPlus } from "react-icons/fa";
import { Problem } from "../../types/Problem";
import ProblemBlock from "../ProblemBlock";
// import './style.scss';
import { useEffect, useState } from "react";
import { PatternProblem } from "../../types/PatternProblem";
import { GetPatternProblems } from "../../api/GetPatternProblems";
import CheckInput from "../CheckInput";
import { AddPatternProblem } from "../../api/AddPatternProblem";
import { toast } from "react-toastify";

interface Props {
    enableAdd?: boolean,
    onClick: Function,
}

const ListPatternProblems = ({enableAdd, onClick}:Props) => {
    const[patternProblems, setPatternProblems] = useState<PatternProblem[] | undefined>();
    const[newPatternProblem, setNewPattern] = useState<string>();
    var listProblems;

    const handlerCreatePattern = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(newPatternProblem && CheckInput(newPatternProblem)){
            AddPatternProblem({name:newPatternProblem}).then((res)=>{
                if(res){
                    toast.success("Добавлено");
                    
                    window.location.reload();
                }
            });
        } else {
            toast.error("Неверные данные");
        }
    }
    useEffect(()=>{
        if(!patternProblems){
            GetPatternProblems().then((res)=>{
                if(res){
                    setPatternProblems(res);
                }
            });
        }
    });
    if(patternProblems){
        listProblems = patternProblems.map((elem)=>{
            return <div className="problem-block w-100" style={{height:"60px",fontWeight:"bold"}} key={elem.id} onClick={()=>onClick(elem)}>
                <p>{elem.name}</p>
            </div>
        });
    }
    return <div className="problems-list flex-column">
        {enableAdd && <form onSubmit={handlerCreatePattern} className="problem-block new-problem-block-field">
            <input value={newPatternProblem} className="field" placeholder="Новый шаблон" onChange={(event)=>setNewPattern(event.target.value)}/>
            <input className="button" type="submit" value="Создать"/>
        </form>}
        {/* {enableAdd && <input value={newPatternProblem} placeholder="Новый шаблон" onChange={(event)=>setNewPattern(event.target.value)} 
            className="problem-block w-100" style={{alignItems:"center",height:"60px",justifyContent:"center",cursor:"text"}}/>} */}
        {/* {enableAdd && <div className="problem-block w-100" style={{alignItems:"center",height:"60px",justifyContent:"center"}}><FaPlus size={32}/></div>} */}
        <div style={{overflowY:"scroll",maxHeight:"150px",margin:"0px",listStyleType:"none",padding:"0px",display:"flex",flexDirection:"column",gap:"10px"}}>
            {listProblems}
        </div>
    </div>
}
export default ListPatternProblems;