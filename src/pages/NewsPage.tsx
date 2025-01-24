import { useEffect, useState } from 'react';
import ListNews from '../components/ListNews';
import './index.scss';
import { News } from '../types/News';
import { GetNews } from '../api/GetNews';
import ConvertImageToBlob from '../components/ConvertImageToBlob';

const NewsPage = () => {
    const [news, setNews] = useState<News[] | undefined>();

    useEffect(()=>{
        if(!news){
            GetNews({limit:0}).then((res)=>{
                if(res){
                    setNews(res);
                }
            });
        }
    });

    return <div className='page'>
        {/* <ListNews news={[{id:1,date:new Date(2024,3,25),mainImage:"https://media.proglib.io/posts/2020/01/14/7a08bc4c611e1ade7d1876d33baec9d5.png",
                title:"Отключаем воду всем",description:"НАВСЕГДАА МУХАХАХАХАХАХАХХА"},
                {id:2,date:new Date(),mainImage:"https://soglasie-krsk.ru/media/img/news/5.png",
                    title:"Поставили баки с мусором",description:"НАВСЕГДАА МУХАХАХАХАХАХАХХА"}]}/> */}
        {news ? <ListNews news={news}/> : <div></div>}
    </div>
}
export default NewsPage;