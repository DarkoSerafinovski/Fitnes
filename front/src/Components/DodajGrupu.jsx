import React, { useState } from 'react';
import axios from 'axios';  // Dodajte axios za slanje POST zahteva
import './DodajGrupu.css';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

const DodajGrupu = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState(null);
    const navigate = useNavigate();  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlika(file); // Čuvanje slike u formi fajla
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kreiranje FormData objekta za slanje podataka
    const formData = new FormData();
    formData.append('naziv', naziv);
    formData.append('opis', opis);
    formData.append('slika', slika); // Dodavanje slike u formData

    try {
      // Slanje podataka na backend
      const response = await axios.post('http://localhost:8000/api/grupe-misica', formData, {
        headers: {
          'Authorization': "Bearer " + sessionStorage.getItem("auth_token"),
          'Content-Type': 'multipart/form-data', // Postavljanje odgovarajućeg tipa sadržaja
        },
      });

      alert('Uspesno sacuvana grupa');
      // Resetovanje forme nakon uspešnog slanja
      setNaziv('');
      setOpis('');
      setSlika(null);
      navigate('/muscle-group');
    } catch (error) {
      console.error('Greška prilikom slanja podataka:', error);
    }
  };

  return (
    <div className="full">
      <Navigation />
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
              required
            />
        
          </div>
          <button type="submit" className="submit-button">Dodaj Grupu</button>
        </form>
      </div>
    </div>
  );
};

export default DodajGrupu;
