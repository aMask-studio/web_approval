import { FC, ReactElement } from "react";
import Icon from "../Icon";
import './style.scss';

const BigButton:FC<{text:string, iconUrl:string, url:string, isSameTab?:boolean}> = ({text, iconUrl, url, isSameTab: isSameTab}) => {
    return <a className="big-button shadow" href={url} target={!isSameTab ? "_blank" : ""}>
        <img src={iconUrl}/>
        {/* <p className="link">{text}</p> */}
        <p dangerouslySetInnerHTML={{ __html: text }} />
    </a>
}
export default BigButton;