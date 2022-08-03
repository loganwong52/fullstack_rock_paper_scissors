import { Link } from 'react-router-dom'
import '../App.css'

// Displays that a game exists and a button
// that when pressed, takes user to the GamePage.
function StartGame({ gameID }) {
    return (
        <div>
            <p>A game exists!</p>
            <button>
                <Link to={`/game/${gameID}`}>
                    Start new game!
                </Link>
            </button>
        </div>
    )
}

export default StartGame