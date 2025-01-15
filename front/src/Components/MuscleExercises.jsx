import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';  // Importujemo axios
import Navigation from './Navigation';
import './MuscleExercises.css';

const MuscleExercises = () => {
  const { muscleGroupId } = useParams();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [categories, setCategories] = useState([]); // Kategorije vežbi
  const [selectedCategory, setSelectedCategory] = useState(''); // Selektovana kategorija
  const [isTrainer, setIsTrainer] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Učitavanje kategorija kada se komponenta mount-uje
    axios.get('http://localhost:8000/api/kategorije-vezbe', {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
      },
    })
    .then((response) => {
      setCategories(response.data.data);  // Postavljamo kategorije
    })
    .catch((error) => {
      console.error('Greška pri učitavanju kategorija:', error);
    });

    // Provera uloge iz sessionStorage
    const role = sessionStorage.getItem('role');
    if (role === 'trener') {
      setIsTrainer(true);
    }

    loadExercises();
  }, [muscleGroupId]);


  const loadExercises = () => {
    const params = selectedCategory ? { kategorija_id: selectedCategory } : {};  // Dodajemo parametar ako je selektovana kategorija

    axios.get(`http://localhost:8000/api/grupe-misica/${muscleGroupId}`, {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
      },
      params,
    })
    .then((response) => {
      setFilteredExercises(response.data.data.vezbe);  // Postavljamo vežbe
    })
    .catch((error) => {
      console.error('Greška pri učitavanju vežbi:', error);
    });
  };

  // Funkcija za promenu selektovane kategorije
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Funkcija za filtriranje vežbi prema vrsti
  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    loadExercises();  // Ponovno učitavanje vežbi kad se promeni kategorija
  }, [selectedCategory, muscleGroupId]);

  return (
    <>
      <Navigation />
      <div className="exercises-container">
        <div className="sidebar">
          <h3>Filter vežbi</h3>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Sve</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.naziv}
              </option>
            ))}
          </select>
        </div>

        <div className="exercises-list">
          <h1>Vežbe za Grupu Mišića</h1>
          {isTrainer && (
            <button className="add-exercise-btn" onClick={() => navigate('/dodaj-vezbu', { state: { muscleGroupId } })}>Dodaj Vezbu</button>
          )}
          <div className="exercise-cards">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <img src={exercise.slika} alt={exercise.naziv} className="exercise-image" />
                <h3>{exercise.naziv}</h3>
                <p>{exercise.opis}</p>
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
