import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MojDnevnik.css';
import Navigation from './Navigation';

const MojDnevnik = () => {
  const [dnevnici, setDnevnici] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Učitaj dnevnik korisnika iz sessionStorage ili sa backend-a
    const korisnickiDnevnici = [
      {
        id: 1,
        naziv: 'Dnevnik za merenje težine',
        slika: 'https://via.placeholder.com/200x200?text=Slika+1',
        kratakOpis: 'Prati napredak u merenju težine tokom vremena.',
      },
      {
        id: 2,
        naziv: 'Dnevnik za brojeve ponavljanja',
        slika: 'https://via.placeholder.com/200x200?text=Slika+2',
        kratakOpis: 'Bilježi broj ponavljanja na bodyweight vežbama.',
      },
      {
        id: 3,
        naziv: 'Dnevnik za snagu',
        slika: 'https://via.placeholder.com/200x200?text=Slika+3',
        kratakOpis: 'Prati napredak u vežbama snage sa tegovima.',
      },
      {
        id: 1,
        naziv: 'Dnevnik za merenje težine',
        slika: 'https://via.placeholder.com/200x200?text=Slika+1',
        kratakOpis: 'Prati napredak u merenju težine tokom vremena.',
      },
      {
        id: 2,
        naziv: 'Dnevnik za brojeve ponavljanja',
        slika: 'https://via.placeholder.com/200x200?text=Slika+2',
        kratakOpis: 'Bilježi broj ponavljanja na bodyweight vežbama.',
      },
      {
        id: 3,
        naziv: 'Dnevnik za snagu',
        slika: 'https://via.placeholder.com/200x200?text=Slika+3',
        kratakOpis: 'Prati napredak u vežbama snage sa tegovima.',
      },
      {
        id: 1,
        naziv: 'Dnevnik za merenje težine',
        slika: 'https://via.placeholder.com/200x200?text=Slika+1',
        kratakOpis: 'Prati napredak u merenju težine tokom vremena.',
      },
      {
        id: 2,
        naziv: 'Dnevnik za brojeve ponavljanja',
        slika: 'https://via.placeholder.com/200x200?text=Slika+2',
        kratakOpis: 'Bilježi broj ponavljanja na bodyweight vežbama.',
      },
      {
        id: 3,
        naziv: 'Dnevnik za snagu',
        slika: 'https://via.placeholder.com/200x200?text=Slika+3',
        kratakOpis: 'Prati napredak u vežbama snage sa tegovima.',
      },
      {
        id: 1,
        naziv: 'Dnevnik za merenje težine',
        slika: 'https://via.placeholder.com/200x200?text=Slika+1',
        kratakOpis: 'Prati napredak u merenju težine tokom vremena.',
      },
      {
        id: 2,
        naziv: 'Dnevnik za brojeve ponavljanja',
        slika: 'https://via.placeholder.com/200x200?text=Slika+2',
        kratakOpis: 'Bilježi broj ponavljanja na bodyweight vežbama.',
      },
      {
        id: 3,
        naziv: 'Dnevnik za snagu',
        slika: 'https://via.placeholder.com/200x200?text=Slika+3',
        kratakOpis: 'Prati napredak u vežbama snage sa tegovima.',
      },
    ];
    setDnevnici(korisnickiDnevnici);
  }, []);

  const handleOpenDnevnik = (id) => {
    // Navigiraj do stranice sa detaljima odabranog dnevnika
    navigate(`/dnevnik/${id}`);
  };

  return (
    <>
        <Navigation/>
        <div className="moj-dnevnik-container">
        <h1>Moj Dnevnik</h1>
        <div className="dnevnik-list">
            {dnevnici.length === 0 ? (
            <p>Nema dnevnika. Dodajte novi dnevnik.</p>
            ) : (
            dnevnici.map((dnevnik) => (
                <div
                key={dnevnik.id}
                className="dnevnik-card"
                onClick={() => handleOpenDnevnik(dnevnik.id)}
                >
                <img src={dnevnik.slika} alt={dnevnik.naziv} className="dnevnik-image" />
                <div className="dnevnik-details">
                    <h3>{dnevnik.naziv}</h3>
                    <p>{dnevnik.kratakOpis}</p>
                </div>
                </div>
            ))
            )}
        </div>
        </div>
    </>
    
  );
};

export default MojDnevnik;
