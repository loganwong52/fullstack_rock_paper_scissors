import Signup from '../components/Signup'
import Login from '../components/Login'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function UserAuthPage() {

    // Display signin form or login form
    const [signedup, setSignedUp] = useState(false)

    // Determine if logged in or not
    const [showGameLink, setShowGameLink] = useState(false)

    return (
        <div>
            <h1>Rock, Paper, Scissors</h1>
            <hr />

            {
                showGameLink
                    ? <button>
                        <Link to={'/home'}>Start a new game!</Link>
                    </button>
                    : ''
            }
            {
                signedup ? <Signup setSignedUp={setSignedUp} />
                    : <Login setSignedUp={setSignedUp} setShowGameLink={setShowGameLink} />
            }

        </div>
    )
}

export default UserAuthPage