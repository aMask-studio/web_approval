import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import { Appeal } from "../types/Appeal";
import { GetAppeals } from "../api/GetAppeals";
import AppealBlock from "../components/AppealBlock";
import Button from "../components/Button";

const AppealsPage = () => {
    const user = useGetUser({ exitToLogin:true,loadUser:false });
    const[appeals, setAppeals] = useState<Appeal[] | undefined>();
    var listAppeals;

    useEffect(()=>{
        if(user){
            GetAppeals({user:user.id}).then((res)=>{
                if(res){
                    setAppeals(res);
                }
            });
        }
    },[user]);

    if(appeals){
        listAppeals = appeals.map((elem)=>{
            return <AppealBlock id={elem.id} title={elem.title} description={elem.description} answer={elem.answer} createDate={elem.createDate}/>
        });
    }

    return <div className="page gap-3">
        {listAppeals}
        <Button type="button" onClick={()=>window.open("/create/appeal","_self")}><span>Создать обращение</span></Button>
    </div>
}
export default AppealsPage;