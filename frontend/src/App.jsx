import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {

  // Display signin form or login form
  const [signedup, setSignedUp] = useState(false)


  return (
    <div className="App">
      <h1>Rock, Paper, Scissors</h1>
      <hr />

      {
        signedup ? <Signup setSignedUp={setSignedUp} />
          : <Login setSignedUp={setSignedUp} />
      }


    </div>
  )
}

export default App
