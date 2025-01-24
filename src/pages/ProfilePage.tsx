import { MouseEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import useGetUser from "../hooks/useGetUser";
import { FaUser } from "react-icons/fa6";
import CheckInput from "../components/CheckInput";
import Modal from "../components/Modal";
import AddressList from "../components/AddressList";
import { Address } from "../types/Address";
import { SetUser } from "../api/SetUser";
import InfoBlock from "../components/InfoBlock";

const ProfilePage = () => {
    const [mailChanging, setMailChanging] = useState<boolean>(false);
    const [nameChanging, setNameChanging] = useState<boolean>(false);

    const user = useGetUser({ exitToLogin:true, loadUser:true });
    const [mail, setMail] = useState<string | undefined>(user?.mail);
    const [name, setName] = useState<string | undefined>(user?.name);
    const [address, setAddress] = useState<Address | undefined>(user?.address);

    const exitFromAccount = () => {
        localStorage.removeItem("accessToken");
        window.open("/","_self");
    }

    const changeMail = () => {
        setMailChanging(!mailChanging);
    }
    const changeName = () => {
        setNameChanging(!nameChanging);
    }
    const changeAddress = (address: Address) => {
        setAddress(address);
    }

    const sendChangedMail = () => {
        if(mail && mail != user?.mail){
            sendData();
        }
    }
    const sendChangedName = () => {
        if(name && name != user?.name){
            sendData();
        }
    }

    const sendData = () => {
        var mailS = mail;
        var nameS = name;
        if(!mailS){
            mailS = user?.mail;
        }
        if(!name){
            nameS = user?.name;
        }
        if(!address){
            setAddress(user?.address);
        }
        if(user && mailS && nameS && address && CheckInput(mailS) && CheckInput(nameS)){
            SetUser({user:user.id,mail:mailS,address:address.address_id,name:nameS}).then((res)=>{
                if(res){
                    window.open("/profile","_self");
                }
            });
        }
    }

    useEffect(() => {
        if (address) {
            sendData();
        }
    }, [address]);

    if(!user){
        return <div className="page profile-page">

        </div>
    }

    return <div className="page profile-page">
        <div className="d-flex flex-row gap-3">
            <FaUser size={52} color='black'/>
            {/* <span className="title">{user.name}</span> */}
            {!nameChanging ?
                <>
                    <p className="title" style={{fontWeight:"bolder"}}>{user.name}</p>
                    <Button style={{padding:"2px 10px 2px 10px"}} className="button-blue" onClick={changeName}><p>Изменить</p></Button>
                </>
            :
                <>
                    <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}} placeholder={user.name}/>
                    <Button style={{ padding: "2px 10px 2px 10px" }} className="button-blue" onClick={()=>{changeName();sendChangedName()}}><p>Сохранить</p></Button>
                </>
            }
        </div>
        <div />
        <InfoBlock title={"Основная информация"}>
            <div className="d-flex flex-row gap-3 align-items-center">
                <p style={{fontWeight:"bold",fontSize:"20px"}}>Электронная почта:</p>
                {!mailChanging ?
                    <>
                        <p style={{fontWeight:"bolder"}}>{user.mail}</p>
                        <Button style={{padding:"5px 10px 5px 10px"}} className="button-blue" onClick={changeMail}><p>Изменить</p></Button>
                    </>
                :
                    <>
                        <input type="text" value={mail} onChange={(event)=>{setMail(event.target.value)}} placeholder={user.mail}/>
                        <Button style={{ padding: "5px 10px 5px 10px" }} className="button-blue" onClick={()=>{changeMail();sendChangedMail()}}><p>Сохранить</p></Button>
                    </>
                }
            </div>
            <hr style={{border:"none"}}/>
            <div className="d-flex flex-row gap-3 align-items-center">
                <p style={{fontWeight:"bold",fontSize:"20px"}}>Адрес проживания:</p>
                <p style={{fontWeight:"bolder"}}>{user.address.address_name}</p>
                <Modal button_open={<Button style={{padding:"5px 10px 5px 10px"}}><p>Изменить адрес проживания</p></Button>}>
                    <AddressList onChoosed={changeAddress} findBoxActive={true}/>
                </Modal>
            </div>
        </InfoBlock>
        <div />
        <div>
            <Button type="button" className="button-red" style={{padding:"10px 15px 10px 15px"}} onClick={exitFromAccount}><p>Выйти из аккаунта</p></Button>
        </div>
    </div>
}
export default ProfilePage;