import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DodajAktivnost.css';
import Navigation from './Navigation';

const DodajAktivnost = () => {
  const { dnevnikId } = useParams();
  const navigate = useNavigate();

  // State za unos naziva i komentara
  const [naziv, setNaziv] = useState('');
  const [komentar, setKomentar] = useState('');

  // Datum je automatski postavljen na trenutni datum
  const datum = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ovdje možemo dodati logiku za slanje podataka na backend
    const novaAktivnost = { naziv, komentar, datum };

    // U ovom primeru samo logujemo podatke
    console.log('Dodata aktivnost:', novaAktivnost);

    // Nakon dodavanja aktivnosti vraćamo se na prethodnu stranicu
    navigate(`/dnevnik/${dnevnikId}`);
  };

  return (
    <>
      <Navigation />
      <div className="dodaj-aktivnost-container">
        <h1>Dodaj Novu Aktivnost</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="naziv">Naziv aktivnosti:</label>
            <input
              type="text"
              id="naziv"
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="komentar">Komentar:</label>
            <textarea
              id="komentar"
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="datum">Datum:</label>
            <input
              type="text"
              id="datum"
              value={datum}
              readOnly
            />
          </div>
          <button type="submit" className="btn-dodaj-aktivnost">
            Dodaj Aktivnost
          </button>
        </form>
      </div>
    </>
  );
};

export default DodajAktivnost;
