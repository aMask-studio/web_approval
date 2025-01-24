import { MouseEventHandler } from "react";
import './style.scss';

interface Props {
    onClick?: MouseEventHandler,
    children: JSX.Element,
    type?: "submit" | "reset" | "button" | undefined,
    style?: React.CSSProperties | undefined,
    className?: string | undefined,
}

const Button = ({onClick, children, type, style, className}:Props) => {
    return <button type={type} className={`button ${className}`} onClick={onClick} style={style}>
        {children}
    </button>
}
export default Button;