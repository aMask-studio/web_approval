import { useEffect, useState } from "react";
import { AddAppeal } from "../api/AddAppeal";
import CheckInput from "../components/CheckInput";
import FormCreate from "../components/FormCreate";
import useGetUser from "../hooks/useGetUser";
import { Appeal } from "../types/Appeal";
import { GetNews } from "../api/GetNews";
import { GetNewsById } from "../api/GetNewsById";
import { News } from "../types/News";
import NewsFormCreate from "../components/NewsFormCreate";
import PreLoader from "../components/Preloader";
import { SetNews } from "../api/SetNews";
import useGetAdmin from "../hooks/useGetAdmin";

const CreateNewsPage = () => {
    //const user = useGetUser({ exitToLogin:true,loadUser:false });
    const admin = useGetAdmin();
    const [news, setNewsS] = useState<News | undefined>();
    const id = Number.parseInt(window.location.href.split("/admin/news/")[1]);

    const handleCreateNews = ({title, description, date}:News) => {
        if(title){
            if(CheckInput(title) && CheckInput(description)){
                SetNews({id:id,title:title,description:description,date:date}).then((res)=>{
                    if(res){
                        window.open("/admin","_self");
                    }
                });
            } else {
    
            }
        }
    }

    useEffect(()=>{
       if(id && !news){
        GetNewsById({id:id}).then((res)=>{
            if(res){
                setNewsS(res[0]);
            }
        });
       } 
    });
    if(!news){
        return <div className="page">
            <PreLoader />
        </div>
    }
    return <div className="page">
        <p className="title">Изменение новости</p>
        <p className="description"></p>
        <NewsFormCreate news={news} onSubmit={handleCreateNews}/>
    </div>
}
export default CreateNewsPage;