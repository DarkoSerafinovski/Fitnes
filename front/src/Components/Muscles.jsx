import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Muscles.css';
import Navigation from './Navigation';

const Muscles = () => {
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMuscleGroups = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/grupe-misica', {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          },
        });
        setMuscleGroups(response.data.data);
      } catch (err) {
        setError('Došlo je do greške pri učitavanju podataka.');
      } finally {
        setLoading(false);
      }
    };

    fetchMuscleGroups();
  }, []);

  if (loading) {
    return <div className="loading">Učitavanje...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <Navigation />
      <div className="home-container">
        <h1>Grupe Mišića</h1>
        <div className="muscle-groups">
          {muscleGroups.map(group => (
            <div key={group.id} className="muscle-card">
              <img src={group.slika} alt={group.naziv} className="muscle-image" />
              <h3>{group.naziv}</h3>
              <p>{group.opis}</p>
              <Link to={`/grupa/${group.id}`} className="details-link">
                Pogledaj detalje
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Muscles;
