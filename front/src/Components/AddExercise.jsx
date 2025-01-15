import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import './AddExercise.css';
import axios from "axios";
import Navigation from "./Navigation";

const AddExercise = () => {
  const { state } = useLocation(); // Preuzimanje parametara iz location.state
  const { muscleGroupId } = state || {};
  const [exerciseData, setExerciseData] = useState({
    name: "",
    image: null,
    description: "",
    muscles: "",
    advice: "",
    sets: "",
    reps: "",
    video: null,
    kategorija_id: "",
    grupa_misica_id: muscleGroupId,
  });

  const [categories, setCategories] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const getAuthHeaders = () => ({
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`, // Token se uzima iz sessionStorage
    }
  });

  useEffect(() => {
    // Učitavanje kategorija
    axios.get('http://localhost:8000/api/kategorije-vezbe',getAuthHeaders())
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => console.error("Greška pri učitavanju kategorija:", error));

    
  }, []);

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

    const formData = new FormData();
    formData.append('naziv', exerciseData.name);
    formData.append('opis', exerciseData.description);
    formData.append('slika', exerciseData.image);
    formData.append('misici_na_koje_utice', exerciseData.muscles);
    formData.append('savet', exerciseData.advice);
    formData.append('preporuceni_broj_ponavljanja', exerciseData.reps);
    formData.append('preporuceni_broj_serija', exerciseData.sets);
    formData.append('video', exerciseData.video);
    formData.append('grupa_misica_id', exerciseData.grupa_misica_id);
    formData.append('kategorija_id', exerciseData.kategorija_id);

    
    // Post zahtev za dodavanje vežbe
    axios.post('http://localhost:8000/api/vezbe', formData, getAuthHeaders())
      .then(response => {
        console.log("Vežba je uspešno dodata:");
        alert('Vežba je uspešno dodata');
      })
      .catch(error => {
        console.error("Greška pri slanju podataka:", error);
      });
  };

  return (
    <>
      <Navigation />
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

          <div className="form-group">
            <label htmlFor="kategorija_id">Kategorija:</label>
            <select
              id="kategorija_id"
              name="kategorija_id"
              value={exerciseData.kategorija_id}
              onChange={handleChange}
              required
            >
              <option value="">Izaberite kategoriju</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.naziv}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn">Dodaj vežbu</button>
        </form>
      </div>
    </>
  );
};

export default AddExercise;
