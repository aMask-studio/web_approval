import { FC, ReactElement, useState, useEffect } from "react";
import './style.scss';

const IconInfoButton:FC<{text:String, icon:ReactElement, count:number}> = ({text, icon, count}) => {
    const [animCount, setCount] = useState("0");

    useEffect(() => {
        let start = 0;
        const end = count
        if (start === end) return;

        let totalMilSecDur = 2;
        let incrementTime = (totalMilSecDur / end) * 1000;

        let timer = setInterval(() => {
          start += 1;
          if(start.toString()[1]=='1') start+=1;
          setCount(String(start))
          if (start === end) clearInterval(timer)     
        }, incrementTime);
      }, [count, 1]);

    return <div className="icon-info-button">
        {icon}
        <p className="title">{animCount}</p>
        <p className="link">{text}</p>
    </div>
}
export default IconInfoButton;