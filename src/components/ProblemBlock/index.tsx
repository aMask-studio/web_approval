import { Problem } from "../../types/Problem";
import { ConvertDate, ConvertDateTime } from "../ConvertDate";
import './style.scss';

const ProblemBlock = ({id, PatternProblem: problem, startDate, endDate, Address: addresses}:Problem) => {
    console.log(addresses);
    const addressString = addresses.length>=3 ? `${addresses[0].address_name}, ${addresses[1].address_name} и ${addresses.length-2} других`
        : addresses.length==2 ? `${addresses[0].address_name}, ${addresses[1].address_name}` : addresses[0].address_name!=null ? `${addresses[0].address_name}`
        : "Адреса не назначены";

    return <a href={`/admin/advertisement/${id}`} className="problem-block">
        {(startDate && endDate) ? <p className="date-text">{ConvertDateTime(startDate)} - {ConvertDateTime(endDate)}</p> : endDate ? 
            <p className="date-text">до {ConvertDateTime(endDate)}</p> : startDate ? <p className="date-text">с {ConvertDateTime(startDate)}</p>
            : <p className="date-text">Внеплановые неполадки</p>
        }
        <p className="title">{problem.name}</p>
        <hr/>
        <p className="addresses-text">{addressString}</p>
    </a>
}
export default ProblemBlock;