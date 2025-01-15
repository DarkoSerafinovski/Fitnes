import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import "./Treneri.css";

const Treneri = () => {
  const [treneri, setTreneri] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Učitavanje trenera sa servera
  useEffect(() => {
    const fetchTreneri = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/treneri?page=${currentPage}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
            },
          }
        );
        setTreneri(response.data.data); // Paginirani podaci
        setTotalPages(response.data.meta.last_page); // Ukupan broj stranica
      } catch (error) {
        console.error("Greška prilikom učitavanja trenera:", error);
      }
    };

    fetchTreneri();
  }, [currentPage]);

  // Brisanje trenera
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da obrišete ovog trenera?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/treneri/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
        },
      });

      // Osveži listu trenera nakon brisanja
      setTreneri(treneri.filter((trener) => trener.id !== id));
      alert("Trener je uspešno obrisan.");
    } catch (error) {
      console.error("Greška prilikom brisanja trenera:", error);
      alert("Došlo je do greške prilikom brisanja trenera.");
    }
  };

  // Promena stranice
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
              <th>Korisničko ime</th>
              <th>Email</th>
              <th>Datum registracije</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {treneri.map((trener) => (
              <tr key={trener.id}>
                <td>{trener.username}</td>
                <td>{trener.email}</td>
                <td>{trener.datum_registracije}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(trener.id)}
                  >
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
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
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
