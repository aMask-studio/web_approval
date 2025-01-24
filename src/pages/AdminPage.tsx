import { FaUser } from "react-icons/fa6";
import useGetAdmin from "../hooks/useGetAdmin";
import PreLoader from "../components/Preloader";
import ListNews from "../components/ListNews";
import { useEffect, useState } from "react";
import { News } from "../types/News";
import { GetNews } from "../api/GetNews";
import { Appeal } from "../types/Appeal";
import { GetAppeals } from "../api/GetAppeals";
import AppealBlock from "../components/AppealBlock";
import CheckInput from "../components/CheckInput";
import { AddAnswerToAppeal } from "../api/AddAnswerToAppeal";
import Button from "../components/Button";
import { Problem } from "../types/Problem";
import { GetProblems } from "../api/GetProblems";
import ListProblems from "../components/ListProblems";
import Modal from "../components/Modal";
import ListPatternProblems from "../components/ListPatternProblems";
import { PatternProblem } from "../types/PatternProblem";
import { AddProblem } from "../api/AddProblem";

const AdminPage = () => {
    const [news, setNews] = useState<News[] | undefined>();
    const [problems, setProblems] = useState<Problem[] | undefined>();
    const [appeals, setAppeals] = useState<Appeal[] | undefined>();
    const [filterAnswered, setFilterAnswered] = useState(false);
    const admin = useGetAdmin();
    var appealsList;

    const newsClickHandler = (id:number) => {
        window.open(`/admin/news/${id}`,"_self");
    }
    const exitFromAccount = () => {
        localStorage.removeItem("accessTokenAdmin");
        window.open("/","_self");
    }
    const appealClickHandler = (id:number, answer:string) => {
        if(CheckInput(answer)){
            AddAnswerToAppeal({id:id,answer:answer}).then((res)=>{
                if(res){
                    window.location.reload();
                }
            });
        }
    }
    const createProblem = (problem: PatternProblem) => {
        if(problem){
            AddProblem({problemId:problem.id}).then((res)=>{
                if(res){
                    window.location.reload();
                }
            });
        }
    }
    useEffect(()=>{
        if(!news){
            GetNews({limit:0}).then((res)=>{
                if(res){
                    setNews(res);
                }
            });
        }
    });
    useEffect(()=>{
        if(!problems){
            GetProblems({}).then((res)=>{
                if(res){
                    console.log(res);
                    setProblems(res);
                }
            });
        }
    });
    useEffect(()=>{
        setAppeals(undefined);
        GetAppeals({filterAnswered:filterAnswered}).then((res)=>{
            if(res){
                setAppeals(res);
            }
        });
    },[filterAnswered]);

    if(!admin){
        return <div className="page">
            <PreLoader />
        </div>
    }
    if(appeals){
        appealsList = appeals.map((elem)=>{
            return <AppealBlock id={elem.id} title={elem.title} description={elem.description} answer={elem.answer} owner={elem.owner} adminOnClick={appealClickHandler} createDate={elem.createDate}/>
        });
    }
    console.log(problems);
    return <div className="page admin-page">
        <div className="d-flex flex-row gap-3 align-items-center">
            <FaUser size={52}/>
            <p className="title">{admin?.login}</p>
        </div>
        <hr/>
        <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-row justify-content-between">
                <p className="subtitle" style={{fontWeight:"bold"}}>Неполадки:</p>
                <div className="d-flex flex-row gap-2">
                    <Modal button_open={<Button style={{padding:"5px 10px"}}><p>Добавить неполадку</p></Button>}>
                        <ListPatternProblems onClick={(elem:PatternProblem)=>{createProblem(elem)}}/>
                    </Modal>
                    <Modal button_open={<Button style={{padding:"5px 10px"}}><p>Показать шаблоны неполадок</p></Button>}>
                        <ListPatternProblems onClick={(elem:PatternProblem)=>{}} enableAdd={true}/>
                    </Modal>
                </div>
            </div>
            {problems && <ListProblems problems={problems} enableAdd={true}/>}
        </div>
        <div className="d-flex flex-column gap-3">
            <p className="subtitle" style={{fontWeight:"bold"}}>Новости:</p>
            <ListNews news={news} onClick={newsClickHandler} addBlock={true}/>
        </div>
        <div />
        <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-row justify-content-between">
                <p className="subtitle" style={{fontWeight:"bold"}}>Обращения:</p>
                {!filterAnswered ? <Button style={{padding:"0px 10px 0px 10px"}} onClick={()=>{setFilterAnswered(true);}}><p>Только без ответа</p></Button> : 
                    <Button style={{padding:"0px 10px 0px 10px"}} onClick={()=>{setFilterAnswered(false);}}><p>С ответом и без</p></Button>}
            </div>
            {appealsList}
        </div>
        <div>
            <Modal button_open={<Button type="button" className="button-red" style={{padding:"10px 15px 10px 15px"}} 
                onClick={()=>{}}><p>Выйти из аккаунта</p></Button>}>
                <div>
                    <p style={{textAlign:"center",fontSize:"32px",fontWeight:"bold",marginBottom:"20px"}}>Вы уверены?</p>
                    <Button onClick={exitFromAccount} style={{padding:"15px 10px 15px 10px",width:"100%"}} className="button-red"><p>Выйти</p></Button>
                </div>
            </Modal>
        </div>
    </div>
}
export default AdminPage;