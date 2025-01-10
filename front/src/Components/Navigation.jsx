import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate za preusmeravanje
import './Navigation.css';

const Navigation = ({ role = 'Vezbac' }) => {  // Default role is Vezbac
  const navigate = useNavigate(); // useNavigate za preusmeravanje

  const handleLogout = () => {
    // Brisanje svih podataka iz sessionStorage
    sessionStorage.clear();
    // Preusmeravanje na login stranicu
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <ul>
          {role === 'Admin' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
              <li><Link to="/add-group">Dodaj Grupu</Link></li>
              <li><Link to="/treneri">Treneri</Link></li>
              <li><Link to="/vezbaci">Vežbači</Link></li>
            </>
          )}
          {role === 'Trener' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
              <li><Link to="/youtube">YouTube</Link></li>
            </>
          )}
          {role === 'Vezbac' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
              <li><Link to="/kreiraj-plan">Sastavi Plan</Link></li>
              <li><Link to="/moj-dnevnik">Moj Dnevnik</Link></li>
              <li><Link to="/dodaj-dnevnik">Dodaj Novi Dnevnik</Link></li>
              <li><Link to="/planovi">Planovi</Link></li>
              <li><Link to="/youtube">YouTube</Link></li>
            </>
          )}
        </ul>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navigation;
