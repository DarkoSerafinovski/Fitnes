import React, { useState } from "react";
import './TrainingPlan.css'; // Povezivanje CSS fajla
import Navigation from "./Navigation";

const TrainingPlan = () => {
  // Držanje informacija o planu
  const [planName, setPlanName] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([]);

  const availableExercises = [
    "Bench Press", "Squat", "Deadlift", "Pull-up", "Push-up", "Overhead Press", "Leg Press", "Lunges"
  ];

  // Funkcija za dodavanje nove vežbe
  const handleAddExercise = () => {
    setExercises([...exercises, { exercise: "", sets: "", reps: "" }]);
  };

  // Funkcija za ažuriranje vežbi
  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = {
      name: planName,
      date: date,
      exercises: exercises
    };
    console.log(planData); // Ovdje možete poslati podatke na server ili sačuvati ih u stanje
  };

  return (
    <>
        <Navigation/>
        <div className="training-plan">
        <h1>Kreiraj dnevni plan</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Datum plana:</label>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
            />
            </div>

            <div>
            <label>Naziv plana:</label>
            <input 
                type="text" 
                value={planName} 
                onChange={(e) => setPlanName(e.target.value)} 
                placeholder="Unesite naziv plana" 
            />
            </div>

            <div className="exercise-list">
            <h3>Vežbe za dan</h3>
            {exercises.map((exercise, index) => (
                <div key={index} className="exercise-item">
                <select 
                    value={exercise.exercise} 
                    onChange={(e) => handleExerciseChange(index, "exercise", e.target.value)}
                >
                    <option value="">Izaberite vežbu</option>
                    {availableExercises.map((ex, idx) => (
                    <option key={idx} value={ex}>{ex}</option>
                    ))}
                </select>
                <input 
                    type="number" 
                    value={exercise.sets} 
                    placeholder="Broj serija" 
                    onChange={(e) => handleExerciseChange(index, "sets", e.target.value)} 
                    min="1" 
                />
                <input 
                    type="number" 
                    value={exercise.reps} 
                    placeholder="Broj ponavljanja" 
                    onChange={(e) => handleExerciseChange(index, "reps", e.target.value)} 
                    min="1" 
                />
                </div>
            ))}
            </div>

            <button type="button" onClick={handleAddExercise}>Dodaj vežbu</button>
            <button type="submit">Sačuvaj plan</button>
        </form>
        </div>
    </>
    
  );
};

export default TrainingPlan;
