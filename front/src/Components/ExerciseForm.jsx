import React, { useState } from 'react';

const ExerciseForm = () => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Dodato: ${exercise}, ${sets} setova, ${reps} ponavljanja`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vežba:
        <input value={exercise} onChange={(e) => setExercise(e.target.value)} />
      </label>
      <label>
        Setovi:
        <input value={sets} onChange={(e) => setSets(e.target.value)} />
      </label>
      <label>
        Ponavljanja:
        <input value={reps} onChange={(e) => setReps(e.target.value)} />
      </label>
      <button type="submit">Dodaj vežbu</button>
    </form>
  );
};

export default ExerciseForm;
