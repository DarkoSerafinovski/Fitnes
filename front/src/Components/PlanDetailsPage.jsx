import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlanDetailsPage.css';
import Navigation from './Navigation';

const PlanDetailsPage = () => {
  const { planId } = useParams(); // Dohvatamo ID plana iz URL-a
  const navigate = useNavigate();
  const [planDetails, setPlanDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  useEffect(() => {
    // Funkcija za dobavljanje podataka o planu
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/plan-treninga/${planId}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`, // Pretpostavljamo da je token u lokalnom skladištu
          },
        });
        setPlanDetails(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Greška prilikom učitavanja podataka!');
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [planId]);

  // Ako su podaci u procesu učitavanja
  if (loading) {
    return <p>Učitavanje...</p>;
  }

  // Ako dođe do greške
  if (error) {
    return <p>{error}</p>;
  }

  // Ako plan nije pronađen
  if (!planDetails) {
    return <p>Plan nije pronađen!</p>;
  }

  return (
    <>
      <Navigation />
      <div className="plan-details-page">
        <h1>{planDetails.naziv}</h1>
        <p><strong>Datum:</strong> {formatDate(planDetails.datum)}</p>
        <h2>Vežbe:</h2>
        <div className="exercises-list">
          {planDetails.planovi_vezbi.map((exercise) => (
            <div key={exercise.id} className="exercise-item">
              <a 
                href={`/exercise/${exercise.vezba.id}`} 
                className="exercise-link"
              >
                {exercise.vezba.naziv}
              </a>
              <p><strong>Serije:</strong> {exercise.broj_serija}</p>
              <p><strong>Ponavljanja:</strong> {exercise.broj_ponavljanja}</p>
            </div>
          ))}
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Nazad
        </button>
      </div>
    </>
  );
};

export default PlanDetailsPage;
