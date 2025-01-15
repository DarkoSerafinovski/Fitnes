import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import './Vezbaci.css';

const Vezbaci = () => {
  const [vezbaci, setVezbaci] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVezbac, setSelectedVezbac] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Broj rezultata po strani
  const [totalPages, setTotalPages] = useState(1);

  // Učitavanje vežbača sa servera
  useEffect(() => {
    const fetchVezbaci = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/vezbaci?page=${currentPage}`,
          {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('auth_token'),
            },
          }
        );
        setVezbaci(response.data.data); // Paginirani podaci
        setTotalPages(response.data.meta.last_page); // Ukupan broj stranica
      } catch (error) {
        console.error('Greška prilikom učitavanja vežbača:', error);
      }
    };

    fetchVezbaci();
  }, [currentPage]);

  // Brisanje vežbača
  const handleDelete = async (id) => {
  

    try {
      await axios.delete(`http://localhost:8000/api/vezbaci/${id}`, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('auth_token'),
        },
      });

      // Osveži listu vežbača nakon brisanja
      setVezbaci(vezbaci.filter((vezbac) => vezbac.id !== id));
      setSelectedVezbac(null);
      alert('Vežbač je uspešno obrisan.');
    } catch (error) {
      console.error('Greška prilikom brisanja vežbača:', error);
      alert('Došlo je do greške prilikom brisanja vežbača.');
    }
  };

  // Promena stranice
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
                <td>{vezbac.username}</td>
                <td>{vezbac.email}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => setSelectedVezbac(vezbac)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Navigacija za strane */}
        <div className="pagination">
          <button
            className="page-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prethodna
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="page-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sledeća
          </button>
        </div>
      </div>

      {/* Modal za potvrdu brisanja */}
      {selectedVezbac && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Upozorenje</h3>
            <p>
              Da li ste sigurni da želite da obrišete vežbača{' '}
              <strong>{selectedVezbac.username}</strong>? Ovim će biti obrisani
              svi njegovi planovi treninga.
            </p>
            <button
              className="confirm-button"
              onClick={() => handleDelete(selectedVezbac.id)}
            >
              Potvrdi Brisanje
            </button>
            <button className="cancel-button" onClick={() => setSelectedVezbac(null)}>
              Otkaži
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vezbaci;
