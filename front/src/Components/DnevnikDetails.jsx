import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DnevnikDetails.css';
import Navigation from './Navigation';

const DnevnikDetails = () => {
  const { dnevnikId } = useParams();
  const [aktivnosti, setAktivnosti] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulacija učitavanja aktivnosti iz backend-a
    const dnevnikAktivnosti = [
      {
        id: 1,
        naziv: 'Trčanje',
        komentar: 'Brzo trčanje na stazi 5 km.',
        datum: '2025-01-06',
      },
      {
        id: 2,
        naziv: 'Push-up vežbe',
        komentar: 'Napravio sam 50 sklekova.',
        datum: '2025-01-05',
      },
      {
        id: 3,
        naziv: 'Čučnjevi',
        komentar: 'Obavio sam 3 serije po 20 čučnjeva.',
        datum: '2025-01-04',
      },
      // ...dodaj ostale aktivnosti
    ];

    // Sortiranje aktivnosti po datumu
    setAktivnosti(dnevnikAktivnosti.sort((a, b) => new Date(b.datum) - new Date(a.datum)));
  }, [dnevnikId]);

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
                <h3>{aktivnost.naziv}</h3>
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
