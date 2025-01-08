import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './ExerciseDetails.css';

const exercisesDetailsData = {
  1: { 
    name: 'Bench Press', 
    description: 'Vežba za grudi, koristi se šipka. Izvoditi sa partnerom za sigurnost.', 
    musclesTargeted: 'Pectorals (grudi), Triceps, Deltoids', 
    tips: 'Pazite na pravilno disanje, nemojte spuštati šipku previše nisko. Preporučena početna kilaža za početnike je 40-50kg.',
    setsReps: '3 serije po 10 ponavljanja.',
    video: '/videos/benchpress.mp4',
    image: '/images/benchpress.jpg'
  },
  2: { 
    name: 'Push-ups', 
    description: 'Klasične sklekove za grudi. Vrlo efikasna vežba za razvoj grudi i tricepsa.', 
    musclesTargeted: 'Pectorals, Triceps, Deltoids', 
    tips: 'Održavajte ravnu liniju tela, kontrolisano spuštajte i podizite telo.',
    setsReps: '4 serije po 15-20 ponavljanja.',
    video: '/videos/pushups.mp4',
    image: '/images/pushups.jpg'
  },
  // Dodajte ostale vežbe...
};

const ExerciseDetails = () => {
  const { exerciseId } = useParams();
  const exercise = exercisesDetailsData[exerciseId];
  const navigate = useNavigate();

  if (!exercise) {
    return (
      <div className="exercise-details-container">
        <Navigation />
        <h1>Vežba nije pronađena</h1>
        <button onClick={() => navigate('/grupa/:1')}>Vratite se na listu vežbi</button>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="exercise-details-container">
        <h1>{exercise.name}</h1>
        <img src={exercise.image} alt={exercise.name} className="exercise-image" />
        <p>{exercise.description}</p>

        <div className="exercise-info">
          <h2>Mišići na koje utiče:</h2>
          <p>{exercise.musclesTargeted}</p>
          
          <h2>Savet:</h2>
          <div className="tips">
            <p>{exercise.tips}</p>
          </div>
          
          <h2>Broj serija i ponavljanja:</h2>
          <div className="sets-reps">
            <p>{exercise.setsReps}</p>
          </div>
          
          <h2>Video uputstvo:</h2>
          <video controls>
            <source src={exercise.video} type="video/mp4" />
            Vaš preglednik ne podržava video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default ExerciseDetails;
