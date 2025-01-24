import './index.scss';
import InfoBlock from '../components/InfoBlock';
import BigButton from '../components/BigButton';
import IconInfoButton from '../components/IconInfoButton';

import { BsHousesFill } from "react-icons/bs";
import { IoPeopleSharp, IoTime } from "react-icons/io5";
import ListNews from '../components/ListNews';
import VisibilitySensor from '../components/VisibilitySensor';
import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import { News } from '../types/News';
import { GetNews } from '../api/GetNews';
import { Problem } from '../types/Problem';
import { GetProblems } from '../api/GetProblems';
import useGetUser from '../hooks/useGetUser';
import ProblemBlock from '../components/ProblemBlock';
import { ConvertDateTime } from '../components/ConvertDate';

import fssp from '../assets/fssp_svg.svg';
import doc from '../assets/Doc.png';
import info from '../assets/info.png';
import krasinf from '../assets/krasinf.png';
import message from '../assets/message.png';
import sber from '../assets/sber.svg';

const MainPage = () => {
    const [news, setNews] = useState<News[] | undefined>();
    const [problem, setProblem] = useState<Problem | undefined>();
    const user = useGetUser({exitToLogin:false,loadUser:false});

    useEffect(()=>{
        if(!news){
            GetNews({limit:3}).then((res)=>{
                if(res){
                    setNews(res);
                }
            });
        }
    });
    useEffect(()=>{
        if(!problem && user?.address){
            GetProblems({addressId:user?.address.address_id}).then((res)=>{
                if(res){
                    console.log(res[0]);
                    setProblem(res[0]);
                }
            });
        }
    },[user]);
    
    return <div className='page main-page gap-5'>
        <div className='d-flex flex-row justify-content-between'>
            <div className='d-flex flex-row gap-3'>
                <img className='logo-img' src={logo}/>
                <p className='link'>Управляющая компания<br/>ООО УК "Согласие"</p>
            </div>
            <div className='list-block' style={{textAlign:'end'}}>
                <a className='link' href="tel:+73912936757">Тел.:.8 (391) 293-67-57</a>
                <a className='link' href="tel:2333040">Аварийная служба: 233-30-40</a>
            </div>
        </div>
        <div className='d-flex adaptive-flex-row gap-5'>
            <InfoBlock title={"Режим работы"} className="info-block-50">
                <p>
                    Пн-Чт: 8:00 – 17:00 (Обед с 12:00 до 13:00)<br/>
                    Пт: 8:00 – 16:00<br/>
                    <a href="tel:+73912936757" >Тел. приемной: 8 (391) 293-67-57</a><br/>
                    Часы работы с жителями: <br/>
                    – Пн: 08-00 до 12-00 <br/>
                    – Вт-неприемный день (работа с документами) <br/>
                    – Ср: 13-00 до 17-00 <br/>
                    – Чт: 13-00 до 17-00 <br/>
                    – Пт: 08-00 до 12-00<br/>
                </p>
            </InfoBlock>
            <InfoBlock title={"Аварийная служба"} className="info-block-50">
                <p>
                    ООО «АТС» 233-30-40 с 8:00 до 17:00<br/>
                    после 17:00 (8-902-962-98-43)
                </p>
            </InfoBlock>
        </div>
        {(user && user.address.address_id && problem && problem?.Address[0].address_id!=null) && <div className='d-flex flex-row justify-content-between gap-5 flex-wrap'>
            <InfoBlock title={problem.PatternProblem.name} className="info-block-100">
                <p style={{fontSize:"22px"}}>По вашему адресу "{user?.address.address_name}" возникли неисправности.</p>
                <div style={{height:"10px"}}/>
                {(problem.startDate || problem.endDate) && <p className='subtitle' style={{fontWeight:"600"}}>Сроки работ:</p>}
                {(problem.startDate && problem.endDate) ? <p className='subtitle'>{ConvertDateTime(problem.startDate)} - {ConvertDateTime(problem.endDate)}</p> :
                    problem.startDate ? <p>с {ConvertDateTime(problem.startDate)}</p> : problem.endDate && <p>до {ConvertDateTime(problem.startDate)}</p>
                }
            </InfoBlock>
        </div>}
        <div className='d-flex flex-row justify-content-between gap-5 flex-wrap'>
            <BigButton url='https://fssp.gov.ru/iss/ip' text={"Узнать о долге"} iconUrl={fssp}/>
            <BigButton url='https://online.sberbank.ru/CSAFront/index.do#/' text={"Оплатить ЖКУ"} iconUrl={sber}/>
            <BigButton url='https://vss.krasinform.ru/login/' text={"Личный кабинет<br/>\"КРАСИНФОРМ\""} iconUrl={krasinf}/>
            <BigButton url='/documents' text={"Документы"} iconUrl={doc} isSameTab={true}/>
            <BigButton url='#about-company' text={"Информация"} iconUrl={info} isSameTab={true}/>
            <BigButton url='https://yandex.ru/maps/org/soglasiye/191420771501/reviews' text={"Отзывы"} iconUrl={message}/>
        </div>
        <div className='d-flex flex-column gap-3' id='about-company'>
            <p className='title'>О КОМПАНИИ</p>
            <VisibilitySensor>
                <div className='d-flex flex-row gap-3 overflow-x'>
                    <IconInfoButton text={"домов в управлении"} icon={<BsHousesFill size={32}/>} count={52}/>
                    <IconInfoButton text={"сотрудников"} icon={<IoPeopleSharp size={32}/>} count={10}/>
                    <IconInfoButton text={"лет работы"} icon={<IoTime size={32}/>} count={8}/>
                </div>
            </VisibilitySensor>
            <InfoBlock title={"Юридическое лицо"}>
                <p>
                    ООО УК «Согласие»: зарегистрирована по адресу г.Красноярск, ул Семафорная д. 231 (660016)<br/><br/>

                    ДИРЕКТОР организации ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ УПРАВЛЯЮЩАЯ КОМПАНИЯ «СОГЛАСИЕ» Лукашенко Сергей Николаевич.<br/>
                    Основным видом деятельности компании является: управление, эксплуатацией жилого фонда за вознаграждение на договорной основе.<br/><br/>

                    ИНН: 2464126568<br/>
                    КПП: 246401001<br/>
                    ОГРН: 1162468068718<br/>
                    ОКПО: 01744872<br/><br/>
                    Действует с 06.04.2016
                </p>
            </InfoBlock>
        </div>
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <p className='title'>ПОСЛЕДНИЕ НОВОСТИ</p>
                <a href='/news' className='link'>Все новости</a>
            </div>
            {news && <ListNews news={news}/>}
        </div>
    </div>
}
export default MainPage;