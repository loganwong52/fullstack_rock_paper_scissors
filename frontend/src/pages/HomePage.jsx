import axios from 'axios'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useState } from 'react'

function HomePage() {

    // Display signin form or login form
    const [signedup, setSignedUp] = useState(false)


    return (
        <div>
            <h1>Rock, Paper, Scissors</h1>
            <hr />

            {
                signedup ? <Signup setSignedUp={setSignedUp} />
                    : <Login setSignedUp={setSignedUp} />
            }
        </div>
    )
}

export default HomePage