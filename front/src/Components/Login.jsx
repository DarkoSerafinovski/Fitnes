import React from 'react';
import { useNavigate } from 'react-router-dom';  // Uvozimo useNavigate
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // Inicijalizujemo navigaciju

  const handleSwitchToRegister = () => {
    navigate('/register');  // Kada kliknemo na dugme, idemo na stranicu za registraciju
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Prijavite se</h1>
        <p>Pridružite se zajednici i kreirajte svoje trening planove!</p>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Unesite vaš email" required />

          <label htmlFor="password">Šifra</label>
          <input type="password" id="password" placeholder="Unesite vašu šifru" required />

          <button type="submit" className="login-btn">Prijavi se</button>
        </form>
        <p className="switch-text">
          Nemate nalog?{' '}
          <button onClick={handleSwitchToRegister} className="register-switch">
            Registrujte se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
