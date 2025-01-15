import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate za preusmeravanje
import './Navigation.css';

const Navigation = () => {  // Default role is Vezbac
  const navigate = useNavigate(); 
  const [role, setRole] = useState('Vezbac'); /// useNavigate za preusmeravanje
  const handleLogout = () => {
    // Brisanje svih podataka iz sessionStorage
    sessionStorage.clear();

    navigate('/');
  };


  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role) {
      setRole(role);
    }
    
  }, [role]);


  return (
    <nav className="navigation">
      <div className="nav-left">
        <ul>
          {role === 'admin' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
              <li><Link to="/add-group">Dodaj Grupu</Link></li>
              <li><Link to="/treneri">Treneri</Link></li>
              <li><Link to="/vezbaci">Vežbači</Link></li>
            </>
          )}
          {role === 'trener' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
              <li><Link to="/youtube">YouTube</Link></li>
            </>
          )}
          {role === 'vezbac' && (
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
