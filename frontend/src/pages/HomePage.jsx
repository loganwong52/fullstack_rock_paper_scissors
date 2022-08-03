import axios from 'axios'
import { useState } from 'react'
import '../App.css'
import CreateGame from '../components/CreateGame'
import StartGame from '../components/StartGame'

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

        // get the user input
        let victoryNumber = parseInt(event.target[0].value)
        let totalThrows = parseInt(event.target[1].value)

        console.log("totalThrows: ", totalThrows)
        console.log("win condition: ", victoryNumber)
        console.dir(event.target)

        if (totalThrows <= 0 || victoryNumber <= 0) {
            console.log('Neither total throws or victory condition can be less than or equal to zero!')
            alert('Neither total throws or victory condition can be less than or equal to zero!')
            return null
        }

        if (totalThrows < victoryNumber) {
            console.log(`Total throws(${totalThrows}) can't be less than the win condition(${victoryNumber})`)
            alert(`Total throws(${totalThrows}) can't be less than the win condition(${victoryNumber})`)
            return null
        }

        axios.post('/home', {
            victoryNumber: victoryNumber,
            totalThrows: totalThrows,
        }).then((response) => {
            console.log('response.data.gameID: ', response.data.gameID)

            setGameExists(true)
            setGameID(response.data.gameID)

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
                    ? <StartGame gameID={gameID} />
                    : <CreateGame handleSubmit={handleSubmit} />
            }

        </div >
    )
}

export default HomePage