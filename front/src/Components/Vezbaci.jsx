import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './Vezbaci.css';

const Vezbaci = () => {
  const [vezbaci, setVezbaci] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVezbac, setSelectedVezbac] = useState(null);

  // Dummy podaci za vežbače, kasnije će biti povezano sa backendom
  useEffect(() => {
    // Ovdje biste pozvali API da dobijete podatke o vežbačima
    const fetchedVezbaci = [
      { id: 1, ime: 'Petar Petrovic', email: 'petar@example.com' },
      { id: 2, ime: 'Ana Anic', email: 'ana@example.com' },
      { id: 3, ime: 'Luka Lukic', email: 'luka@example.com' },
    ];
    setVezbaci(fetchedVezbaci);
  }, []);

  const handleDelete = (id) => {
    // Ovdje implementirate logiku za brisanje vežbača i njegovih podataka sa backend-a
    setVezbaci(vezbaci.filter((vezbac) => vezbac.id !== id));
    setShowDeleteModal(false);
  };

  const handleShowModal = (vezbac) => {
    setSelectedVezbac(vezbac);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedVezbac(null);
  };

  return (
    <div>
      <Navigation />
      <div className="vezbaci-container">
        <h1>Lista Vežbača</h1>
        <table className="vezbaci-table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {vezbaci.map((vezbac) => (
              <tr key={vezbac.id}>
                <td>{vezbac.ime}</td>
                <td>{vezbac.email}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleShowModal(vezbac)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Upozorenje</h3>
            <p>
              Da li ste sigurni da želite da obrišete vežbača{' '}
              <strong>{selectedVezbac?.ime}</strong>? Ovim će biti obrisani
              svi njegovi planovi treninga.
            </p>
            <button
              className="confirm-button"
              onClick={() => handleDelete(selectedVezbac.id)}
            >
              Potvrdi Brisanje
            </button>
            <button className="cancel-button" onClick={handleCloseModal}>
              Otkaži
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vezbaci;
