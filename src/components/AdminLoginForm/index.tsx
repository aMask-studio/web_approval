import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../api/ConnectionData';
import './style.scss';
import Button from '../Button';

interface AdminLoginFormProps {
  onSuccess?: (token: string) => void;
}

function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API}/login_admin`, {
        login: username,
        password
      });

      const { accessTokenAdmin } = response.data;

      localStorage.setItem('accessTokenAdmin', accessTokenAdmin);

      if (onSuccess) {
        onSuccess(accessTokenAdmin);
      }

      alert('Вы успешно вошли!');
      window.open("/admin","_self");
    } catch (error) {
      console.error((error as any).response?.data);
      alert('Ошибка входа. Проверьте введённые данные.');
    }
  };

  return (
    <form className='login-form'>
      <p className='title'>Вход</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Логин"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <Button type="button" onClick={handleLogin}><p>Войти</p></Button>
    </form>
  );
}

export default AdminLoginForm;