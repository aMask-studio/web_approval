import { CSSProperties, FC } from 'react';
import './style.scss';

const InfoBlock:FC<{title:String, children:any, className?:String, style?: CSSProperties, titleButtons?:JSX.Element}> 
        = ({title, children, className, style, titleButtons}) => {
    return <div style={style} className={`info-block shadow ${className}`}>
        <div className='d-flex flex-row justify-content-between align-content-center'>
            <h3 className='title'>{title}</h3>
            <div className='d-flex flex-row align-content-center'>
                {titleButtons}
            </div>
        </div>
        <hr/>
        {children}
    </div>
}
export default InfoBlock;