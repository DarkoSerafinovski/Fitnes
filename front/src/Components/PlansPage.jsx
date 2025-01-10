import React from 'react';
import './PlansPage.css';
import Navigation from './Navigation';

const PlansPage = () => {
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
        <Navigation/>
        <div className="plans-page">
        <h1>Vaši planovi</h1>
        <div className="plans-container">
            {userPlans.map((plan) => (
            <div key={plan.id} className="plan-card">
                <h2>{plan.name}</h2>
                <p><strong>Datum:</strong> {plan.date}</p>
                <div className="exercises-list">
                {plan.exercises.map((exercise, index) => (
                    <div key={index} className="exercise-item">
                    <p><strong>Vežba:</strong> {exercise.name}</p>
                    <p><strong>Serije:</strong> {exercise.sets}</p>
                    <p><strong>Ponavljanja:</strong> {exercise.reps}</p>
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>
        </div>
    </>
  );
};

export default PlansPage;
