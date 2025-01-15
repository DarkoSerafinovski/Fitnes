import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import './ExerciseDetails.css';

const ExerciseDetails = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null); // Držimo podatke o vežbi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  // Učitavanje podataka o vežbi
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        // Poziv API-ja za dobijanje podataka o vežbi
        let response = await axios.get(`http://localhost:8000/api/vezbe/${exerciseId}`, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
          },
        });

        const exerciseData = response.data.data;
        setExercise(exerciseData);
        console.log(exerciseData);
        // Učitavanje video fajla
        response = await axios.get(exerciseData.video_url, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('auth_token')}`,
          },
          responseType: "blob", // Za video
        });

        const fileUrl = URL.createObjectURL(response.data);
        setVideoUrl(fileUrl);
      } catch (err) {
        setError('Greška prilikom učitavanja podataka');
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  if (loading) {
    return <div>Učitavanje...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        <h1>{exercise.naziv}</h1>
        <img src={exercise.slika} alt={exercise.naziv} className="exercise-image" />
        <p>{exercise.opis}</p>

        <div className="exercise-info">
          <h2>Mišići na koje utiče:</h2>
          <p>{exercise.misici_na_koje_utice}</p>

          <h2>Savet:</h2>
          <div className="tips">
            <p>{exercise.savet}</p>
          </div>

        

          <h2>Preporučeni broj serija i ponavljanja:</h2>
          <div className="sets-reps">
          <p>{exercise.preporuceni_broj_serija} serija, {exercise.preporuceni_broj_ponavljanja} ponavljanja</p>
        </div>
          <h2>Video uputstvo:</h2>
          {videoUrl ? (
            <video controls>
              <source src={videoUrl} type="video/mp4" />
              Vaš preglednik ne podržava video tag.
            </video>
          ) : (
            <p>Video nije dostupan</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ExerciseDetails;
