import { FaPlus } from "react-icons/fa";
import { Problem } from "../../types/Problem";
import ProblemBlock from "../ProblemBlock";
import './style.scss';

interface Props {
    problems: Problem[],
    enableAdd?: boolean,
}

const ListProblems = ({problems, enableAdd}:Props) => {
    var listProblems;

    console.log(problems);
    if(problems){
        listProblems = problems.map((elem)=>{
            return <ProblemBlock id={elem.id} startDate={elem.startDate} endDate={elem.endDate} 
                Address={elem.Address} PatternProblem={elem.PatternProblem}/>
        });
    }
    return <div className="problems-list">
        {/* {enableAdd && <div className="problem-block" style={{alignItems:"center",justifyContent:"center"}}><FaPlus size={62}/></div>} */}
        {listProblems}
    </div>
}
export default ListProblems;