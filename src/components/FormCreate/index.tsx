import { useState } from "react";
import './style.scss';
import Button from "../Button";

interface FormCreateProps {
    onSubmit: (data: any) => void;
}
  
const FormCreate = ({ onSubmit }: FormCreateProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ title, description });
    };

    console.log(title);

    return <div className="form-create">
        <form onSubmit={handleSubmit}>
        <label>
            Заголовок
            <input type="text" className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
            Суть проблемы
            <textarea className="description-input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <Button type="submit" onClick={()=>{}}><p>Отправить</p></Button>
        </form>
    </div>
};
export default FormCreate;