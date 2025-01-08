import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './MuscleExercises.css';

const exercisesData = {
  1: [  // Grudi
    { id: 1, name: 'Bench Press', type: 'Vezbe sa sipkom', description: 'Vežba za grudi, koristi se šipka.', image: '/images/benchpress.jpg' },
    { id: 2, name: 'Push-ups', type: 'Calisthenics', description: 'Klasične sklekove za grudi.', image: '/images/pushups.jpg' },
  ],
  2: [  // Leđa
    { id: 3, name: 'Deadlift', type: 'Vezbe sa sipkom', description: 'Vežba za leđa i noge sa šipkom.', image: '/images/deadlift.jpg' },
    { id: 4, name: 'Pull-ups', type: 'Calisthenics', description: 'Vežba za leđa koristeći telesnu težinu.', image: '/images/pullups.jpg' },
  ],
  3: [  // Noge
    { id: 5, name: 'Squat', type: 'Vezbe sa sipkom', description: 'Vežba za noge sa šipkom.', image: '/images/squat.jpg' },
    { id: 6, name: 'Leg Press', type: 'Vezbe na masinama', description: 'Vežba za noge na spravi.', image: '/images/legpress.jpg' },
  ],
};

const MuscleExercises = () => {
  const { muscleGroupId } = useParams();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [isTrainer, setIsTrainer] = useState(true);
  const navigate = useNavigate();  // Umesto useHistory

  useEffect(() => {
    if (muscleGroupId && exercisesData[muscleGroupId]) {
      setFilteredExercises(exercisesData[muscleGroupId]);
    }

    // Provera uloge iz sessionStorage
    const role = sessionStorage.getItem('role');
    if (role === 'trener') {
      setIsTrainer(true);
    }
  }, [muscleGroupId]);

  const handleFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredData = selectedType === 'All' 
    ? filteredExercises 
    : filteredExercises.filter(exercise => exercise.type === selectedType);

  const handleAddExercise = () => {
    navigate('/dodaj-vezbu');  // Redirektovanje na stranicu za dodavanje vežbe
  };

  return (
    <>
      <Navigation />
      <div className="exercises-container">
        <div className="sidebar">
          <h3>Filter vežbi</h3>
          <select onChange={handleFilterChange} value={selectedType}>
            <option value="All">Sve</option>
            <option value="Calisthenics">Calisthenics</option>
            <option value="Vezbe sa bucicama">Vezbe sa bucicama</option>
            <option value="Vezbe sa sipkom">Vezbe sa sipkom</option>
            <option value="Vezbe na masinama">Vezbe na masinama</option>
          </select>
        </div>

        <div className="exercises-list">
          <h1>Vežbe za Grupu Mišića</h1>
          {isTrainer && (
            <button className="add-exercise-btn" onClick={handleAddExercise}>Dodaj Vezbu</button>
          )}
          <div className="exercise-cards">
            {filteredData.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                <h3>{exercise.name}</h3>
                <p>{exercise.description}</p>
                <Link to={`/exercise/${exercise.id}`} className="details-link">Pogledaj detalje</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MuscleExercises;
