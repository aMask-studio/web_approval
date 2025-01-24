import './style.scss';
import { News } from '../../types/News';
import { ConvertDate } from '../ConvertDate';
import { ConvertToImage } from '../ConvertBlob';
import { useEffect, useState } from 'react';
import { API } from '../../api/ConnectionData';
import Button from '../Button';
import { DeleteNews } from '../../api/DeleteNews';
import Modal from '../Modal';

const NewsBlock = ({id, title, description, date, onClick}:News) => {
    var shortDescription = description.length > 40 ? description.substring(0,40)+"..." : description;

    const handleDelete = () => {
        //alert(2);
        DeleteNews({id:id}).then((res)=>{
            if(res){
                window.location.reload();
            }
        });
    }

    if(onClick){
        return <a style={{padding:"0px",position:"relative"}} className='news-block'>
            <Modal style={{position:"absolute",right:"0",top:"0",margin:"15px 15px 0px 0px"}} button_open={<Button style={{padding:"2px 10px",fontSize:"16px"}} className='button-red'><p>Удалить</p></Button>}>
                <div>
                    <p style={{textAlign:"center",fontSize:"32px",fontWeight:"bold",marginBottom:"20px"}}>Вы уверены?</p>
                    <Button onClick={handleDelete} style={{padding:"15px 10px 15px 10px",width:"100%"}} className="button-red"><p>Удалить</p></Button>
                </div>
            </Modal>
            <a style={{padding:"15px",width:"100%"}} onClick={()=>onClick(id)}>
                <span style={{marginBottom:"-5px",alignItems:"center",justifyContent:"space-between",display:"flex",width:"100%"}}>{ConvertDate(date)}</span>
                <p className='title'>{title}</p>
                <p className='description-text'>{shortDescription}</p>
            </a>
        </a>
    } else {
        return <a href={`/news/${id}`} className='news-block'>
            <span style={{marginBottom:"-5px"}}>{ConvertDate(date)}</span>
            <p className='title'>{title}</p>
            <p className='description-text'>{shortDescription}</p>
        </a>
    }
}
export default NewsBlock;