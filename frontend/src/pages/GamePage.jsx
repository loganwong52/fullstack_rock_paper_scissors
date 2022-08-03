import axios from 'axios'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function GamePage() {
    let { gameID } = useParams()
    const [totalThrows, setTotalThrows] = useState(3)
    const [victoryNum, setVictoryNum] = useState(2)

    // on mount, axios get the game, given the ID
    useEffect(() => {
        console.log("gameID is: ", gameID)

        axios.get(`/game/${gameID}`).then((response) => {
            console.log(response)

            // set the 2 state values
            setTotalThrows(response.data.total_throws)
            setVictoryNum(response.data.victory_num)
        })

    }, [])




    return (
        <div>
            <h1>Playing a game!</h1>
            <h2>gameID: {gameID}</h2>
            <h3>Best {victoryNum} out of {totalThrows}</h3>
            <hr />


        </div>
    )
}

export default GamePage