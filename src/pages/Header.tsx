import './index.scss';
import { MdLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import useGetUser from '../hooks/useGetUser';

const Header = () => {
    const user = useGetUser({ exitToLogin:false,loadUser:true });

    return <div className="header">
        <div className='navigation'>
            <a href='/'>Главная</a>
            {/* <a>Мероприятия</a> */}
            <a href='/news'>Новости</a>
            <a href='/contacts'>Контакты</a>
            {user && <a href='/appeals'>Обращения</a>}
        </div>
        {!user ? 
        <div className='profile'>
            <a className='text-decoration-none' href='/login'><MdLogin size={26} color='white'/><span>Войти</span></a>
            <a className='text-decoration-none' href='/login'><FaUser size={20} color='white'/><span>Регистрация</span></a>
        </div> 
        : 
        <div className='profile'>
            <a className='text-decoration-none gap-3' href='/profile'><FaUser size={26} color='white'/><span>{user.name}</span></a>
        </div>
        }
    </div>
}
export default Header;