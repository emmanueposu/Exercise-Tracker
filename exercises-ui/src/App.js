import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import {useState} from 'react';

function App() {

  const  [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Use this page to log your workouts.</p>
      </header>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
          <Route path="/add-exercise" element={<AddExercisePage />}></Route>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
        </Routes>
      </Router>
      <footer>© 2022 Prince Emmanuel</footer>
    </div>
  );
}

export default App;
