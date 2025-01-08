import React from 'react';
import { Link } from 'react-router-dom';
import './Muscles.css';
import Navigation from './Navigation';

const muscleGroups = [
  { id: 1, name: "Grudi", description: "Vežbe za jačanje grudi.", image: "/images/grudi.jpg" },
  { id: 2, name: "Leđa", description: "Vežbe za leđa i donji deo kičme.", image: "/images/ledja.jpg" },
  { id: 3, name: "Noge", description: "Vežbe za jačanje nogu i kvadricepsa.", image: "/images/noge.jpg" },
  { id: 4, name: "Ruke", description: "Vežbe za bicepse i tricepse.", image: "/images/ruke.jpg" },
  { id: 5, name: "Ramena", description: "Vežbe za ramena i gornji deo tela.", image: "/images/ramena.jpg" },
  { id: 6, name: "Trbuh", description: "Vežbe za jačanje trbušnih mišića.", image: "/images/trbuh.jpg" },
  { id: 7, name: "Butine", description: "Vežbe za unutrašnje i spoljašnje butine.", image: "/images/butine.jpg" },
];

const Muscles = () => {
  return (
    <>
      <Navigation />
      <div className="home-container">
        <h1>Grupe Mišića</h1>
        <div className="muscle-groups">
          {muscleGroups.map(group => (
            <div key={group.id} className="muscle-card">
              <img src={group.image} alt={group.name} className="muscle-image" />
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <Link to={`/grupa/${group.id}`} className="details-link">
                Pogledaj detalje
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Muscles;
