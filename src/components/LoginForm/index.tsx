import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../api/ConnectionData';
import './style.scss';
import Button from '../Button';
import CheckInput from '../CheckInput';
import { toast } from 'react-toastify';

interface LoginFormProps {
  onSuccess?: (token: string) => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    if(username && password && CheckInput(username) && CheckInput(password) && username.includes("@")){
      try {
        const response = await axios.post(`${API}/login`, {
          mail: username,
          password
        });
  
        const { accessToken } = response.data;
  
        localStorage.setItem('accessToken', accessToken);
  
        if (onSuccess) {
          onSuccess(accessToken);
        }
  
        alert('Вы успешно вошли!');
        window.open("/","_self");
      } catch (error) {
        console.error((error as any).response?.data);
        alert('Ошибка входа. Проверьте введённые данные.');
      }
    } else if(!username.includes("@")) {
      toast.error("Введите корректную почту");
    } else {
      toast.error("Неверные данные");
    }
  };
  const handleRegister = async (event: React.MouseEvent) => {
    event.preventDefault();

    if(username && password && CheckInput(username) && CheckInput(password) && username.includes("@")){
      try {
        const response = await axios.post(`${API}/register`, {
          mail: username,
          password
        });
        console.log(response);

        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);

        if (onSuccess) {
          onSuccess(accessToken);
        }

        alert('Вы успешно вошли!');
        window.open("/","_self");
      } catch (error) {
        console.error((error as any).response?.data);
        alert(`Ошибка входа. ${(error as any).response?.data}`);
      }
    } else if(!username.includes("@")) {
      toast.error("Введите корректную почту");
    } else {
      toast.error("Неверные данные");
    }
  };

  return (
    <form className='login-form'>
      <p className='title'>Вход</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Электронная почта"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <Button type="button" onClick={handleLogin}><p>Войти</p></Button>
      <p className='text-center' style={{margin:"-10px 0px"}}>или</p>
      {/* <button type="submit">Зарегистрироваться</button> */}
      <Button type="button" onClick={handleRegister}><p>Зарегистрироваться</p></Button>
    </form>
  );
}

export default LoginForm;