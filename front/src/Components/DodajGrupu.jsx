import React, { useState } from 'react';
import './DodajGrupu.css';
import Navigation from './Navigation';

const DodajGrupu = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlika(URL.createObjectURL(file)); // Privremeni URL za prikaz slike
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Logika za slanje podataka na backend ili čuvanje u bazi
    const newGroup = {
      naziv,
      opis,
      slika,
    };

    console.log(newGroup); // Ovo treba zameniti sa pozivom API-ja za slanje podataka

    // Resetovanje forme
    setNaziv('');
    setOpis('');
    setSlika(null);
  };

  return (
    <div  className="full">
        <Navigation/>
        <div className="dodaj-grupu-container">
        <h1>Dodaj Novu Grupu Mišića</h1>
        <form onSubmit={handleSubmit} className="dodaj-grupu-form">
            <div className="form-group">
            <label htmlFor="naziv">Naziv Grupa Mišića</label>
            <input
                type="text"
                id="naziv"
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="opis">Opis Grupa Mišića</label>
            <textarea
                id="opis"
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="slika">Slika Grupa Mišića</label>
            <input
                type="file"
                id="slika"
                accept="image/*"
                onChange={handleImageChange}
            />
            {slika && <img src={slika} alt="Prethodna slika" className="preview-image" />}
            </div>
            <button type="submit" className="submit-button">Dodaj Grupu</button>
        </form>
        </div>
    </div>
  );
};

export default DodajGrupu;
