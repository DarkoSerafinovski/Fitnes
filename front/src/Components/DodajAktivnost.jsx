import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DodajAktivnost.css';
import Navigation from './Navigation';

const DodajAktivnost = () => {
  const { dnevnikId } = useParams();
  const navigate = useNavigate();

  // State za unos naziva, komentara i datuma
  const [naziv, setNaziv] = useState('');
  const [komentar, setKomentar] = useState('');
  const [datum, setDatum] = useState(new Date().toLocaleDateString('en-CA')); // Koristi format YYYY-MM-DD za date picker
  const [error, setError] = useState(null); // State za greške

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Priprema podataka za slanje
    const novaAktivnost = { naziv_aktivnosti: naziv, komentar, datum };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/dnevnici/${dnevnikId}/stavke`, 
        novaAktivnost,
        {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        }
      );

      
      alert('Uspesno ste dodali aktivnost');
      navigate(`/dnevnik/${dnevnikId}`);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        setError('Došlo je do greške prilikom dodavanja aktivnosti.');
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className="dodaj-aktivnost-container">
        <h1>Dodaj Novu Aktivnost</h1>
        {error && (
          <div className="error-message">
            {Object.values(error).map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}
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
              type="date"
              id="datum"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              required
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
