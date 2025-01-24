import { FC } from "react";

const Icon:FC<{url:string}> = ({url}) => {
    return <img src={url}/>
}
export default Icon;