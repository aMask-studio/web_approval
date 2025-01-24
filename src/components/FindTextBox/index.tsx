import { useState } from "react";
// import search_icon from "../../assets/search.png"
import { FaSearch } from "react-icons/fa";
import './style.scss';

interface Props {
    value?: string,
    onChange: Function,
    type?: React.HTMLInputTypeAttribute,
    width?: number,
    height: number,
}

const FindTextBox = ({value, onChange, type, width, height}: Props) => {
    const [txt, setTxt] = useState<string>();

    return <li className="find-search-box">
        <input style={{width:width,height:height}} className="find-text-box" onChange={(event)=>{setTxt(txt);onChange(event)}} value={value} type={type}/>
        {/* <img src={search_icon} alt="" className="search-icon"/> */}
        <FaSearch className="search-icon" />
    </li>
}
export default FindTextBox;