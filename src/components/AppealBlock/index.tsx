import { useState } from "react";
import { Appeal } from "../../types/Appeal";
import './style.scss';
import Button from "../Button";
import Modal from "../Modal";
import { DeleteAppeal } from "../../api/DeleteAppeal";
import { ConvertDateTime } from "../ConvertDate";

const AppealBlock = ({id, title, description, answer, adminOnClick, owner, createDate}: Appeal) => {
    const [rDescription, setRDescription] = useState(compressText());
    const [adminAnswer, setAnswer] = useState<string | undefined>(answer);

    const handlerClickText = () => {
        if(rDescription == description){
            setRDescription(compressText());
        } else {
            setRDescription(description);
        }
    }
    function compressText() {
        if(description.length>80){
            return description.substring(0,80) + "... развернуть";
        } else {
            return description;
        }
    }
    const deleteAppeal = () => {
        DeleteAppeal({id:id}).then((res)=>{
            if(res){
                window.location.reload();
            }
        });
    }

    return <div key={id} className="appeal-block">
        <div className="title-block">
            <div>
                <p>{ConvertDateTime(createDate)}</p>
                <p className="subtitle">{title}</p>
                {adminOnClick && <div style={{height:"10px"}}/>}
                {adminOnClick && <p>от <span style={{fontWeight:"bold"}}>{owner?.name}</span></p>}
                {(adminOnClick && owner?.address.address_name) && <p>адрес проживания <span style={{fontWeight:"bold"}}>{owner?.address.address_name}</span></p>}
            </div>
            <Modal button_open={<Button style={{padding:"5px 10px 5px 10px"}} className="button-red"><p>Отозвать</p></Button>}>
                <div>
                    <p style={{textAlign:"center",fontSize:"32px",fontWeight:"bold",marginBottom:"20px"}}>Вы уверены?</p>
                    <Button onClick={deleteAppeal} style={{padding:"15px 10px 15px 10px",width:"100%"}} className="button-red"><p>Отозвать</p></Button>
                </div>
            </Modal>
        </div>
        <hr/>
        <p onClick={handlerClickText} className="description-text">{rDescription}</p>
        {(answer || adminOnClick) && <hr/>}
        {(answer && !adminOnClick) && <p style={{fontWeight:"bold"}}>Ответ от управляющей компании: <p style={{fontWeight:"normal"}}>{answer}</p></p>}
        {adminOnClick && 
            <div className="w-100">
                <details className="d-flex flex-column gap-3">
                    <summary style={{fontWeight:"bold",fontSize:"20px",listStyle:"none"}}>Написать ответ</summary>
                    <textarea className="answer-input w-100" value={adminAnswer} onChange={(e) => setAnswer(e.target.value)} />
                    {/* <Button className="w-100"><p>Отправить</p></Button> */}
                    <Modal button_open={<Button style={{padding:"5px 10px 5px 10px",width:"100%"}} className="button-blue"><p>Отправить</p></Button>}>
                        <div>
                            <p style={{textAlign:"center",fontSize:"32px",fontWeight:"bold",marginBottom:"20px"}}>Вы уверены?</p>
                            <Button onClick={()=>adminOnClick(id,adminAnswer)} style={{padding:"15px 10px 15px 10px",width:"100%"}} className="button-blue"><p>Отправить</p></Button>
                        </div>
                    </Modal>
                </details>
            </div>
        }
    </div>
}
export default AppealBlock;