import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Uvozimo useNavigate
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicijalizujemo navigaciju

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulacija prijave - ovde biste implementirali stvarnu logiku autentifikacije
    if (email === 'test@example.com' && password === '123') {
      navigate('/muscle-group'); // Preusmeravanje nakon uspešne prijave
    } else {
      setError('Neispravan email ili šifra.');
    }
  };

  const handleSwitchToRegister = () => {
    navigate('/register'); // Prelazak na stranicu za registraciju
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Prijavite se</h1>
        <p>Pridružite se zajednici i kreirajte svoje trening planove!</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Unesite vaš email"
            required
          />

          <label htmlFor="password">Šifra</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesite vašu šifru"
            required
          />

          {error && <p className="error-text">{error}</p>}

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
