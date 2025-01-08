import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import Muscles from './Components/Muscles';
import DodajGrupu from './Components/DodajGrupu';
import Treneri from './Components/Treneri';
import Vezbaci from './Components/Vezbaci';
import MuscleExercises from './Components/MuscleExercises';
import ExerciseDetails from './Components/ExerciseDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} /> 
          <Route path="/muscle-group" element={<Muscles />} /> 
          <Route path="/add-group" element={<DodajGrupu />} /> 
          <Route path="/treneri" element={<Treneri />} /> 
          <Route path="/vezbaci" element={<Vezbaci />} /> 
          <Route path="/grupa/:muscleGroupId" element={<MuscleExercises />} /> 
          <Route path="/exercise/:exerciseId" element={<ExerciseDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
