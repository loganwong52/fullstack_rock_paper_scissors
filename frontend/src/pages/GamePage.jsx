import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DisplayPoints from '../components/DisplayPoints'
import DisplayThrows from '../components/DisplayThrows'
import PlayerThrowButtons from '../components/PlayerThrowButtons'
import ShowVictory from '../components/ShowVictory'


function GamePage() {
    let { gameID } = useParams()
    const [totalThrows, setTotalThrows] = useState(3)
    const [victoryNum, setVictoryNum] = useState(2)
    const [someoneWon, setSomeoneWon] = useState(false)

    // keep track of player & computer throws
    const [playerRPS, setPlayerRPS] = useState('')
    const [computerRPS, setComputeRPS] = useState('')
    const [roundWinner, setRoundWinner] = useState('')

    // only keep track of how many throws they've won
    const [playerThrows, setPlayerThrows] = useState(0)
    const [computerThrows, setComputerThrows] = useState(0)





    // on mount, axios get the game, given the ID
    useEffect(() => {
        axios.get(`/game/${gameID}`).then((response) => {
            console.log(response)

            // set the 2 state values
            setTotalThrows(response.data.total_throws)
            setVictoryNum(response.data.victory_num)
        })

    }, [])


    // when playerThrows and computerThrows are both updated, print!
    useEffect(() => {
        console.log("Player's throws won: ", playerThrows)
        console.log("Computer's  throws won: ", computerThrows)

        if (playerThrows === victoryNum || computerThrows === victoryNum) {
            setSomeoneWon(true)
        }

    }, [playerThrows, computerThrows])



    return (
        <div>
            <h1>Playing a game!</h1>
            <h2>gameID: {gameID}</h2>
            <h3>Best {victoryNum} out of {totalThrows}</h3>
            <button>
                <Link to={'/'}>Return to the Login Page</Link>
            </button>
            <p>
                HOW TO PLAY: Click on any 1 of the buttons. Immediately after you click it,
                the AI player will randomly choose rock, paper, or scissors to play against you!
            </p>
            <hr />

            <DisplayPoints playerThrows={playerThrows} computerThrows={computerThrows} />

            <DisplayThrows playerRPS={playerRPS} computerRPS={computerRPS} roundWinner={roundWinner} />


            {someoneWon
                ? <ShowVictory playerThrows={playerThrows} victoryNum={victoryNum} computerThrows={computerThrows} />
                :
                <PlayerThrowButtons
                    setPlayerRPS={setPlayerRPS}
                    playerThrows={playerThrows}
                    setComputeRPS={setComputeRPS}
                    setPlayerThrows={setPlayerThrows}
                    setComputerThrows={setComputerThrows}
                    computerThrows={computerThrows}
                    setRoundWinner={setRoundWinner}
                />
            }

        </div>
    )
}

export default GamePage