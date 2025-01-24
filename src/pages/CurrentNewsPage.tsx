import { useEffect, useState } from 'react';
import './index.scss';
import { News } from '../types/News';
import { GetNewsById } from '../api/GetNewsById';
import { ConvertDate } from '../components/ConvertDate';
import PreLoader from '../components/Preloader';

const CurrentNewsPage = () => {
    const [news, setNews] = useState<News | undefined>();
    const id = Number(window.location.href.split('/news/')[1]);

    useEffect(()=>{
        if(!news && Number.isInteger(id)){
            GetNewsById({ id: id }).then((res)=>{
                if(res){
                    setNews(res[0]);
                }
            });
        }
    });

    if(!Number.isInteger(id)){
        return <div className='page'>
            <p className='title'>Такой новости нет (ошибка в адресной строке)</p>
        </div>
    }
    if(!news){
        return <div className='page'>
            <PreLoader />
        </div>
    }

    return <div className='page gap-0 current-news-page'>
        <p className='subtitle'>{ConvertDate(news?.date)}</p>
        <p className='title'>{news?.title}</p>
        <hr />
        {news && <p className='description' dangerouslySetInnerHTML={{ __html: news?.description }} />}
    </div>
}
export default CurrentNewsPage;