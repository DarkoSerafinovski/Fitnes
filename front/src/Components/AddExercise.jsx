import React, { useState } from "react";
import './AddExercise.css';
import Navigation from "./Navigation";

const AddExercise = () => {
  const [exerciseData, setExerciseData] = useState({
    name: "",
    image: null,
    description: "",
    muscles: "",
    advice: "",
    sets: "",
    reps: "",
    video: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setExerciseData({
      ...exerciseData,
      image: file,
    });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setExerciseData({
      ...exerciseData,
      video: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(exerciseData);
    // Pošaljite podatke na server ili obradite ih lokalno
  };

  return (
    <>
        <Navigation/>
        <div className="add-exercise">
        <h1>Dodaj novu vežbu</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="name">Naziv vežbe:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={exerciseData.name}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="image">Slika vežbe:</label>
            <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="description">Kratak opis:</label>
            <textarea
                id="description"
                name="description"
                value={exerciseData.description}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="muscles">Mišići na koje utiče:</label>
            <textarea
                id="muscles"
                name="muscles"
                value={exerciseData.muscles}
                onChange={handleChange}
                placeholder="Navedite mišiće na koje vežba utiče"
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="advice">Savet:</label>
            <textarea
                id="advice"
                name="advice"
                value={exerciseData.advice}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="sets">Preporučeni broj serija:</label>
            <input
                type="number"
                id="sets"
                name="sets"
                value={exerciseData.sets}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="reps">Preporučeni broj ponavljanja:</label>
            <input
                type="number"
                id="reps"
                name="reps"
                value={exerciseData.reps}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="video">Video tutorijal:</label>
            <input
                type="file"
                id="video"
                name="video"
                onChange={handleVideoChange}
                accept="video/*"
                required
            />
            </div>

            <button type="submit" className="submit-btn">Dodaj vežbu</button>
        </form>
        </div>
    </>
    
  );
};

export default AddExercise;
