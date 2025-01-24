import { toast } from "react-toastify";
import { AddAppeal } from "../api/AddAppeal";
import CheckInput from "../components/CheckInput";
import FormCreate from "../components/FormCreate";
import useGetUser from "../hooks/useGetUser";
import { Appeal } from "../types/Appeal";

const CreateAppealPage = () => {
    const user = useGetUser({ exitToLogin:true,loadUser:false });

    const handleCreateAppeal = ({title, description}:Appeal) => {
        if(CheckInput(title) && CheckInput(description) && user){
            AddAppeal({title:title,description:description,user:user.id}).then((res)=>{
                if(res){
                    window.open("/appeals","_self");
                }
            });
        } else {
            toast.error("Неверные данные");
        }
    }

    return <div className="page">
        <p className="title">Создание обращения</p>
        <p className="description"></p>
        <FormCreate onSubmit={handleCreateAppeal}/>
    </div>
}
export default CreateAppealPage;