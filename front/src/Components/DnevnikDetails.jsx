import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DnevnikDetails.css';
import Navigation from './Navigation';
import axios from 'axios';

const DnevnikDetails = () => {
  const { dnevnikId } = useParams();
  const [aktivnosti, setAktivnosti] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Funkcija za učitavanje aktivnosti iz backend-a
    const fetchAktivnosti = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/dnevnici/${dnevnikId}`, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });

        // Postavljanje aktivnosti u stanje
        setAktivnosti(response.data.data.stavke_dnevnika);
      } catch (error) {
        console.error('Error loading aktivnosti:', error);
      }
    };

    fetchAktivnosti();
  }, [dnevnikId]); // Učitaj ponovo ako se dnevnikId promeni

  const handleDodajAktivnost = () => {
    navigate(`/dodaj-aktivnost/${dnevnikId}`);
  };

  return (
    <>
      <Navigation />
      <div className="dnevnik-details-container">
        <h1>Aktivnosti Dnevnika</h1>
        <button className="btn-dodaj-aktivnost" onClick={handleDodajAktivnost}>
          Dodaj Novu Aktivnost
        </button>
        <div className="aktivnosti-container">
          {aktivnosti.length === 0 ? (
            <p>Nema aktivnosti. Dodajte novu aktivnost.</p>
          ) : (
            aktivnosti.map((aktivnost) => (
              <div key={aktivnost.id} className="aktivnost-card">
                <h3>{aktivnost.naziv_aktivnosti}</h3>
                <p>{aktivnost.komentar}</p>
                <small>{new Date(aktivnost.datum).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default DnevnikDetails;
