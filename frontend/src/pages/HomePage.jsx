import axios from 'axios'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    const [gameExists, setGameExists] = useState(false)
    const [gameID, setGameID] = useState(0)


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken



    const handleSubmit = (event) => {
        event.preventDefault()

        let victoryNumber = event.target[1].value
        let totalThrows = event.target[0].value

        // get the user input
        console.log("NEW GAME INPUT: ", victoryNumber, totalThrows)
        console.dir(event.target)

        axios.post('/home', {
            victoryNumber: victoryNumber,
            totalThrows: totalThrows,
        }).then((response) => {
            console.log('response from server: ', response.data)

            setGameExists(true)
            setGameID(response.gameID)

            document.getElementById("total-throws").value = ""
            document.getElementById("victory-num").value = ""

        }).catch((error) => {
            console.log("There was an error in your input!", error)

            document.getElementById("total-throws").value = ""
            document.getElementById("victory-num").value = ""
        })


        return null
    }

    return (
        <div>
            <h1>Start a new game!</h1>
            <hr />

            {
                gameExists
                    ? <div>
                        <p>A game exists!</p>
                        <button>
                            <Link to={`/game/${gameID}`}>
                                Start new game!
                            </Link>
                        </button>

                    </div>
                    : <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Enter total number of throws to play:
                                <input id="total-throws" type="text" name="name" />
                            </label>
                            <br />
                            <br />
                            <label>
                                Enter number of throws to win:
                                <input id="victory-num" type="text" name="email" />
                            </label>
                            <br />
                            <br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
            }

        </div>
    )
}

export default HomePage