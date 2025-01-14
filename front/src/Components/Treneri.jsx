import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './Treneri.css';

const Treneri = () => {
  const [treneri, setTreneri] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Broj trenera po stranici

  // Dummy podaci za trenere, kasnije će biti povezano sa backendom
  useEffect(() => {
    const fetchedTreneri = [
      { id: 1, ime: 'Marko Marković', email: 'marko@example.com' },
      { id: 2, ime: 'Jovana Jovanović', email: 'jovana@example.com' },
      { id: 3, ime: 'Nikola Nikolić', email: 'nikola@example.com' },
      { id: 4, ime: 'Ana Anić', email: 'ana@example.com' },
      { id: 5, ime: 'Milan Milovanović', email: 'milan@example.com' },
    ];
    setTreneri(fetchedTreneri);
  }, []);

  // Logika za brisanje trenera
  const handleDelete = (id) => {
    setTreneri(treneri.filter((trener) => trener.id !== id));
  };

  // Logika za paginaciju
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = treneri.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(treneri.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            {currentItems.map((trener) => (
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

        {/* Paginacija */}
        <div className="pagination">
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt; Prethodna
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Sledeća &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Treneri;
