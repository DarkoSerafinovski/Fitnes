import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './Treneri.css';

const Treneri = () => {
  const [treneri, setTreneri] = useState([]);

  // Dummy podaci za trenere, kasnije će biti povezano sa backendom
  useEffect(() => {
    // Ovdje biste pozvali API da dobijete podatke o trenerima
    const fetchedTreneri = [
      { id: 1, ime: 'Marko Marković', email: 'marko@example.com' },
      { id: 2, ime: 'Jovana Jovanović', email: 'jovana@example.com' },
      { id: 3, ime: 'Nikola Nikolić', email: 'nikola@example.com' },
    ];
    setTreneri(fetchedTreneri);
  }, []);

  const handleDelete = (id) => {
    // Ovdje treba implementirati logiku za brisanje trenera sa backend-a
    setTreneri(treneri.filter((trener) => trener.id !== id));
  };

  return (
    <div>
      <Navigation />
      <div className="treneri-container">
        <h1>Lista Trenera</h1>
        <table className="treneri-table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Brisanje</th>
            </tr>
          </thead>
          <tbody>
            {treneri.map((trener) => (
              <tr key={trener.id}>
                <td>{trener.ime}</td>
                <td>{trener.email}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(trener.id)}>
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Treneri;
