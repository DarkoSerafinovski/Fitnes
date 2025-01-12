import React from 'react';
import './PlansPage.css';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

const PlansPage = () => {
  const navigate = useNavigate();

  // Simulacija planova korisnika
  const userPlans = [
    {
      id: 1,
      date: '2025-01-10',
      name: 'Plan za jačanje nogu',
      exercises: [
        { name: 'Čučnjevi', sets: 4, reps: 12 },
        { name: 'Iskoraci', sets: 3, reps: 10 },
        { name: 'Leg Press', sets: 4, reps: 15 },
      ],
    },
    {
      id: 2,
      date: '2025-01-08',
      name: 'Plan za gornji deo tela',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 8 },
        { name: 'Zgibovi', sets: 3, reps: 10 },
        { name: 'Rameni Potisak', sets: 4, reps: 12 },
      ],
    },
    {
      id: 3,
      date: '2025-01-05',
      name: 'Kardio i izdržljivost',
      exercises: [
        { name: 'Trčanje (km)', sets: 1, reps: 5 },
        { name: 'Plank (sekunde)', sets: 3, reps: 60 },
        { name: 'Burpees', sets: 3, reps: 15 },
      ],
    },
  ];

  return (
    <>
      <Navigation />
      <div className="plans-page">
        <h1>Vaši planovi</h1>
        <div className="plans-container">
          {userPlans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <h2>{plan.name}</h2>
              <p><strong>Datum:</strong> {plan.date}</p>
              <p><strong>Broj vežbi:</strong> {plan.exercises.length}</p>
              <button 
                className="view-plan-btn" 
                onClick={() => navigate(`/plan/${plan.id}`)}>
                Pogledaj Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlansPage;
