import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import UserAuthPage from './pages/UserAuthPage';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<UserAuthPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/game/:gameID' element={<GamePage />} />

        </Routes>
      </Router>

    </div>
  )
}

export default App