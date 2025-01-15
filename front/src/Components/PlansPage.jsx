import React, { useState, useEffect } from "react";
import axios from "axios";
import './PlansPage.css';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

const PlansPage = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]); // Plans from the backend
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long', // Ponedeljak
      year: 'numeric', // 2025
      month: 'long',   // mart
      day: 'numeric',  // 14
    };
    return new Intl.DateTimeFormat('sr-RS', options).format(date);
  };
  
  const [authToken] = useState(sessionStorage.getItem("auth_token"));

  // Number of plans per page
  const plansPerPage = 10;

  // Fetching plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/plan-treninga', {
          params: {
            page: pagination.currentPage,
            per_page: plansPerPage,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data && response.data.data) {
          setPlans(response.data.data);
          setPagination({
            currentPage: response.data.meta.current_page,
            totalPages: response.data.meta.last_page,
            totalItems: response.data.meta.total,
          });
        } else {
          console.error("Nepravilna struktura podataka:", response);
        }
      } catch (error) {
        console.error("Greška prilikom dobijanja planova:", error);
      }
    };

    fetchPlans();
  }, [pagination.currentPage, authToken]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  return (
    <>
      <Navigation />
      <div className="plans-page">
        <h1>Vaši planovi</h1>
        <div className="plans-container">
          {plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <h2>{plan.naziv}</h2>
              <p><strong>Datum:</strong> {formatDate(plan.datum)}</p>
              <p><strong>Broj vežbi:</strong> {plan.planovi_vezbi.length}</p>
              <button 
                className="view-plan-btn" 
                onClick={() => navigate(`/plan/${plan.id}`)}>
                Pogledaj Plan
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
          >
            Prethodna
          </button>
          <span className="pagination-info">
            Stranica {pagination.currentPage} od {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="pagination-button"
          >
            Sledeća
          </button>
        </div>
      </div>
    </>
  );
};

export default PlansPage;
