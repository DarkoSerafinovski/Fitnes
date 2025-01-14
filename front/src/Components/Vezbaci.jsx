import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './Vezbaci.css';

const Vezbaci = () => {
  const [vezbaci, setVezbaci] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVezbac, setSelectedVezbac] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Broj rezultata po strani

  // Dummy podaci za vežbače, kasnije će biti povezano sa backendom
  useEffect(() => {
    const fetchedVezbaci = [
      { id: 1, ime: 'Petar Petrovic', email: 'petar@example.com' },
      { id: 2, ime: 'Ana Anic', email: 'ana@example.com' },
      { id: 3, ime: 'Luka Lukic', email: 'luka@example.com' },
      { id: 4, ime: 'Mila Milic', email: 'mila@example.com' },
    ];
    setVezbaci(fetchedVezbaci);
  }, []);

  const handleDelete = (id) => {
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

  // Logika za paginaciju
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVezbaci = vezbaci.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vezbaci.length / itemsPerPage);

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
            {currentVezbaci.map((vezbac) => (
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
