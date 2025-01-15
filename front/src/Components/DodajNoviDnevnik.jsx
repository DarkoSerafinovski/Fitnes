import React, { useState } from 'react';
import axios from 'axios';
import './DodajNoviDnevnik.css';
import Navigation from './Navigation';

const DodajNoviDnevnik = () => {
  const [naslov, setNaslov] = useState('');
  const [kratakOpis, setKratakOpis] = useState('');
  const [loading, setLoading] = useState(false); // Dodajte loading stanje
  const [error, setError] = useState(null); // Dodajte error stanje
  const [success, setSuccess] = useState(null); // Dodajte success stanje

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Postavite loading na true dok traje slanje zahteva
    setLoading(true);
    setError(null); // Reset error

    try {
      const response = await axios.post(
        'http://localhost:8000/api/dnevnici',  // Koristite odgovarajući URL
        {
          naslov,
          kratak_opis: kratakOpis,
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
          },
        }
      );

      setSuccess('Dnevnik uspešno dodat!');
      setNaslov('');  // Resetujte formu
      setKratakOpis('');
    } catch (err) {
      setError('Došlo je do greške prilikom dodavanja dnevnika.');
      console.error(err);
    } finally {
      setLoading(false); // Završite sa loading-om
    }
  };

  return (
    <>
      <Navigation />
      <div className="dodaj-dnevnik-container">
        <h1>Dodaj Novi Dnevnik</h1>
        <form onSubmit={handleSubmit} className="dodaj-dnevnik-form">
          <div className="form-group">
            <label htmlFor="naslov">Naslov Dnevnika:</label>
            <input
              type="text"
              id="naslov"
              value={naslov}
              onChange={(e) => setNaslov(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="kratakOpis">Kratak Opis:</label>
            <textarea
              id="kratakOpis"
              value={kratakOpis}
              onChange={(e) => setKratakOpis(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Dodavanje...' : 'Dodaj Dnevnik'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </>
  );
};

export default DodajNoviDnevnik;
