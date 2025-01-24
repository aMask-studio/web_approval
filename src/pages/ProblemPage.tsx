import { ChangeEvent, useEffect, useState } from "react";
import { Problem } from "../types/Problem";
import { GetProblems } from "../api/GetProblems";
import PreLoader from "../components/Preloader";
import InfoBlock from "../components/InfoBlock";
import Button from "../components/Button";
import { Address } from "../types/Address";
import { GetAddresses } from "../api/GetAddresses";
import { PatternProblem } from "../types/PatternProblem";
import ListPatternProblems from "../components/ListPatternProblems";
import Modal from "../components/Modal";
import { SetProblem } from "../api/SetProblem";
import { DeleteProblem } from "../api/DeleteProblem";
import { toast } from "react-toastify";

const ProblemPage = () => {
    const id = Number.parseInt(window.location.href.split("/advertisement/")[1]);
    const [problem, setProblem] = useState<Problem | undefined>();
    const [addresses, setAddresses] = useState<Address[] | undefined>();
    const [allAddresses, setAllAddresses] = useState<Address[] | undefined>();
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    var choosedAddressList;
    var unChoosedAddressList;

    const handleChangeStartDate = (event:ChangeEvent<HTMLInputElement>) => {
        if(endDate && new Date(event.target.value) > new Date(endDate)){
            toast.error("Дата начала больше чем дата конца");
            return;
        }
        setStartDate(event.target.value);
    }
    const handleChangeEndDate = (event:ChangeEvent<HTMLInputElement>) => {
        if(startDate && new Date(event.target.value) < new Date(startDate)){
            toast.error("Дата конца больше чем дата начала");
            return;
        }
        setEndDate(event.target.value);
    }
    const saveProblem = () => {
        if(problem && addresses){
            SetProblem({id:problem.id,PatternProblem:problem.PatternProblem,
                Address:addresses,startDate:startDate,endDate:endDate}).then((res)=>{
                if(res){
                    window.location.reload();
                }
            });
        }
    }
    const handleAddressChoosed = (address: Address) => {
        if(address){
            //alert(1);
            if (addresses?.includes(address)) {
                setAddresses((prevAddresses) =>
                  prevAddresses ? prevAddresses.filter((addr) => addr !== address) : []
                );
            } else {
                setAddresses((prevAddresses) => [
                    ...(prevAddresses ?? []),
                    address,
                ]);
            }
        }
    }
    const handleProblemChanged = (problemS: PatternProblem) => {
        if(problemS){
            var prbl = problem;
            if(prbl){
                prbl.PatternProblem = problemS;
                setProblem(prbl);
            }
        }
    }
    const setChooseAll = () => {
        console.log(allAddresses?.length);
        console.log(addresses?.length);
        if(allAddresses?.length==addresses?.length){
            if(problem?.Address.length != allAddresses?.length){
                setAddresses(problem?.Address);
            } else {
                if(allAddresses){
                    setAddresses([allAddresses[0]]);
                }
            }
        } else {
            setAddresses(allAddresses);
        }
    }
    const handleDelete = () => {
        if(problem){
            DeleteProblem({id:problem?.id}).then((res)=>{
                if(res){
                    window.open('/admin/','_self');
                }
            });
        }
    }
    useEffect(()=>{
        if(!problem && id){
            GetProblems({id:id}).then((res)=>{
                if(res){
                    setProblem(res[0]);
                }
            });
        }
    });
    useEffect(()=>{
        if(!allAddresses){
            GetAddresses().then((res)=>{
                if(res){
                    setAllAddresses(res);
                }
            });
        }
    });
    useEffect(()=>{
        if(!addresses){
            setAddresses(problem?.Address);
        }
    },[problem, problem?.Address]);
    useEffect(()=>{
        if(!startDate && problem?.startDate){
            const ddt = new Date(problem?.startDate);
            console.log(ddt);
            ddt.setHours(ddt.getHours()+7);

            const formattedDate = ddt.toISOString().slice(0, -5);

            setStartDate(formattedDate);
        }
    },[problem]);
    useEffect(()=>{
        if(!endDate && problem?.endDate){
            const ddt = new Date(problem?.endDate);
            console.log(ddt);
            ddt.setHours(ddt.getHours()+7);

            const formattedDate = ddt.toISOString().slice(0, -5);

            setEndDate(formattedDate);
        }
    },[problem]);

    if(!problem || !addresses || !allAddresses){
        return <div className="page">
            <PreLoader/>
        </div>
    }
    // choosedAddressList = addresses.map((elem)=>{
    //     return <li key={elem.address_id} onClick={()=>handleAddressChoosed(elem)} style={{margin:"0px 0px 5px 0px",cursor:"pointer"}}>{elem.address_name}</li>
    // });
    // unChoosedAddressList = allAddresses.filter(item => !addresses.includes(item)).map((elem)=>{
    //     return <li key={elem.address_id} onClick={()=>handleAddressChoosed(elem)} style={{margin:"0px 0px 5px 0px",cursor:"pointer"}}>{elem.address_name}</li>
    // });
    console.log(addresses);
    if(allAddresses){
        choosedAddressList = addresses.map((elem)=>{
            return <li key={elem.address_id} onClick={()=>handleAddressChoosed(elem)} style={{margin:"0px 0px 5px 0px",cursor:"pointer",textDecoration:"underline"}}>{elem.address_name}</li>
        });
        unChoosedAddressList = allAddresses.filter(item => !addresses.includes(item)).map((elem)=>{
            return <li key={elem.address_id} onClick={()=>handleAddressChoosed(elem)} style={{margin:"0px 0px 5px 0px",cursor:"pointer"}}>{elem.address_name}</li>
        });
    }
    console.log(unChoosedAddressList); //style={{position:"absolute",right:"0",top:"0",margin:"15px 15px 0px 0px"}}
    return <div className="page problem-page">
        <InfoBlock title={"Неполадка"} titleButtons={
            <Modal button_open={<Button style={{padding:"5px 10px",fontSize:"16px"}} className='button-red'><p>Удалить</p></Button>}>
                <div>
                    <p style={{textAlign:"center",fontSize:"32px",fontWeight:"bold",marginBottom:"20px"}}>Вы уверены?</p>
                    <Button onClick={handleDelete} style={{padding:"15px 10px 15px 10px",width:"100%"}} className="button-red"><p>Удалить</p></Button>
                </div>
            </Modal>
            }>
            <div style={{display:"flex",flexDirection:"row", alignItems:"center",gap:"20px"}}>
                <p className="subtitle" style={{fontWeight:"bold"}}>{problem.PatternProblem.name}</p>
                {/* <Modal button_open={<Button style={{padding:"5px 10px"}}><p>Изменить</p></Button>}>
                    <ListPatternProblems onClick={(elem:PatternProblem)=>handleProblemChanged(elem)}/>
                </Modal> */}
            </div>
            <div>
                <p>Дата начала:</p>
                <input type="datetime-local" className="date-input" value={startDate} onChange={handleChangeStartDate} />
                <div style={{height:"10px"}}/>
                <p>Дата завершения:</p>
                <input type="datetime-local" className="date-input" value={endDate} onChange={handleChangeEndDate} />
            </div>            
        </InfoBlock>
        <div/>
        <InfoBlock title={"Адреса"} style={{height:"480px",overflowY:"scroll"}}
            titleButtons={<Button onClick={setChooseAll} style={{padding:"0px 10px"}}><p>Выбрать все</p></Button>}>
            <div className="d-flex flex-column" style={{width:"100%"}}>
                <ul style={{overflowY:"hidden",margin:"0px",listStyleType:"none",padding:"0px",columns:"5"}}>
                    {choosedAddressList}
                    {unChoosedAddressList}
                </ul>
            </div>
        </InfoBlock>
        <div style={{height:"0px"}}/>
        <Button onClick={saveProblem} className="button-blue" style={{padding:"15px 5px",width:"100%"}}>
            <p>Сохранить</p>
        </Button>
    </div>
}
export default ProblemPage;