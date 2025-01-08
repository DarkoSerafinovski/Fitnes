import React, { useState } from 'react';
import './DodajNoviDnevnik.css';
import Navigation from './Navigation';

const DodajNoviDnevnik = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika za slanje podataka, može biti slanje na backend ili dodavanje u state
    console.log('Novi dnevnik:', { naziv, opis, slika });
  };

  return (
    <>
      <Navigation />
      <div className="dodaj-dnevnik-container">
        <h1>Dodaj Novi Dnevnik</h1>
        <form onSubmit={handleSubmit} className="dodaj-dnevnik-form">
          <div className="form-group">
            <label htmlFor="naziv">Naziv Dnevnika:</label>
            <input
              type="text"
              id="naziv"
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="opis">Kratak Opis:</label>
            <textarea
              id="opis"
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="slika">Slika Dnevnika:</label>
            <input
              type="url"
              id="slika"
              value={slika}
              onChange={(e) => setSlika(e.target.value)}
              placeholder="URL slike"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Dodaj Dnevnik</button>
        </form>
      </div>
    </>
  );
};

export default DodajNoviDnevnik;
