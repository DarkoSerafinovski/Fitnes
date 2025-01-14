import React, { useState } from 'react';
import './DodajNoviDnevnik.css';
import Navigation from './Navigation';

const DodajNoviDnevnik = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState(null); // Čuva fajl umesto URL-a

  const handleFileChange = (e) => {
    setSlika(e.target.files[0]); // Postavlja izabranu sliku
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika za slanje podataka
    console.log('Novi dnevnik:', {
      naziv,
      opis,
      slika: slika ? slika.name : 'Nema slike', // Prikazuje ime fajla
    });
    // Ovde dodaj kod za slanje slike na backend ako je potrebno
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
              type="file"
              id="slika"
              onChange={handleFileChange}
              accept="image/*" // Prihvata samo slike
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
