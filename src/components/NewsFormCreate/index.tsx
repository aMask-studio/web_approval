import { ChangeEvent, useEffect, useState } from "react";
import './style.scss';
import Button from "../Button";
import { News } from "../../types/News";
import { ConvertDate, ConvertDateToDatePicker } from "../ConvertDate";

interface FormCreateProps {
    onSubmit: (data: any) => void,
    news: News,
}
  
const NewsFormCreate = ({ onSubmit, news }: FormCreateProps) => {
    const [title, setTitle] = useState(news.title);
    const [description, setDescription] = useState(news.description);
    const [date, setDate] = useState(news.date);

    function handleDateChange(event:ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        
        if (!inputValue || !isValidDate(inputValue)) return;
        
        try {
          const parsedDate = new Date(inputValue);
          setDate(parsedDate);
        } catch (error:any) {
          console.error('Invalid date:', error.message);
        }
    }
    
    function isValidDate(value: string) {
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ title, description, date });
    };

    return <div className="form-create">
        <form onSubmit={handleSubmit}>
            <label>
                Заголовок
                <input type="text" className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            <label>
                Описание
                <textarea className="description-input" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <label>
                Дата
                <input type="date" className="date-input" value={ConvertDateToDatePicker(date)} onChange={handleDateChange} />
            </label>
            <br />
            <Button type="submit" onClick={()=>{}}><p>Изменить</p></Button>
        </form>
    </div>
};
export default NewsFormCreate;