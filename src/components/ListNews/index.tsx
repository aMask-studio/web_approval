import { FaPlus } from "react-icons/fa";
import { FC, ReactElement, useState } from "react";
import { News } from "../../types/News";
import NewsBlock from "../NewsBlock";
import './style.scss';
import { AddNews } from "../../api/AddNews";

const ListNews:FC<{news?:News[], onClick?:Function|undefined, addBlock?:boolean|undefined}> = ({news, onClick, addBlock}) => {
    const [rNews, setNews] = useState<News[] | undefined>(undefined);
    var listNews;

    const handleAddNews = () => {
        AddNews({id:0, title:"Заголовок новости", description:"Описание новости", date:new Date()}).then((res)=>{
            if(res) {
                window.open(`/admin/news/${res.insertId}`,"_self");
            }
        });
    }

    if(!rNews){
        if(!news){

        }
        else{
            setNews(news);
        }
    }
    
    if(rNews){
        listNews = rNews.map((element)=>{
            return <NewsBlock id={element.id} title={element.title} description={element.description} date={element.date} onClick={onClick}/>
        });
    }
    return <div className="list-news">
        {addBlock && 
        <div className="news-block align-items-center justify-content-center" onClick={handleAddNews}>
            <FaPlus size={62}/>
        </div>}
        {listNews}
    </div>
}
export default ListNews;