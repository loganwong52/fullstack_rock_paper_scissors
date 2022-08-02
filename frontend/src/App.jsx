import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import { useEffect, useState } from 'react'

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/rps' element={<GamePage />} />

        </Routes>
      </Router>

    </div>
  )
}

export default App
