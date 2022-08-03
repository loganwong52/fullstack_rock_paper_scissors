import axios from 'axios'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


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



    // computer's choices
    const computerChoices = ['ROCK', 'PAPER', 'SCISSORS']

    // on mount, axios get the game, given the ID
    useEffect(() => {
        axios.get(`/game/${gameID}`).then((response) => {
            console.log(response)

            // set the 2 state values
            setTotalThrows(response.data.total_throws)
            setVictoryNum(response.data.victory_num)
        })

    }, [])

    function handleThrow(userThrow) {
        console.log("Player's throw: ", userThrow)
        setPlayerRPS(userThrow)

        // computer throws ROCK, PAPER, OR SCISSORS
        let choice = Math.floor(Math.random() * 3)
        let computerThrow = computerChoices[choice]
        console.log("computer choice: ", computerThrow)
        setComputeRPS(computerThrow)

        // determine who wins!
        if (userThrow === computerThrow) {
            console.log("TIE!")
            setRoundWinner("TIE!")

        } else if (userThrow === "ROCK" && computerThrow === "SCISSORS") {
            console.log("Player wins!")
            setPlayerThrows(playerThrows + 1)
            setRoundWinner("You won this round!")

        } else if (userThrow === "ROCK" && computerThrow === "PAPER") {
            console.log("Computer wins!")
            setComputerThrows(computerThrows + 1)
            setRoundWinner("The computer won this round!")

        } else if (userThrow === "PAPER" && computerThrow === "SCISSORS") {
            console.log("Computer wins!")
            setComputerThrows(computerThrows + 1)
            setRoundWinner("The computer won this round!")

        } else if (userThrow === "PAPER" && computerThrow === "ROCK") {
            console.log("Player wins!")
            setPlayerThrows(playerThrows + 1)
            setRoundWinner("You won this round!")

        } else if (userThrow === "SCISSORS" && computerThrow === "ROCK") {
            console.log("Computer wins!")
            setComputerThrows(computerThrows + 1)
            setRoundWinner("The computer won this round!")

        } else if (userThrow === "SCISSORS" && computerThrow === "PAPER") {
            console.log("Player wins!")
            setPlayerThrows(playerThrows + 1)
            setRoundWinner("You won this round!")

        }

    }


    // Display points
    const renderPoints = () => {
        return (
            <div>
                <h3>POINTS</h3>
                You: {playerThrows}
                <br />
                Computer: {computerThrows}
                <hr />
            </div>
        )
    }

    // Display player's choice & computer's choice
    const renderThrows = () => {
        return (
            <div>
                <h3>You threw: {playerRPS}</h3>
                <h3>Computer threw: {computerRPS}</h3>
                <h3>{roundWinner}</h3>
            </div>
        )
    }


    // when playerThrows and computerThrows are both updated, print!
    useEffect(() => {
        console.log("Player's throws won: ", playerThrows)
        console.log("Computer's  throws won: ", computerThrows)

        if (playerThrows === victoryNum || computerThrows === victoryNum) {
            setSomeoneWon(true)
        }

    }, [playerThrows, computerThrows])

    const declareWinner = () => {
        let winner = "The Computer"

        if (playerThrows === victoryNum && computerThrows !== victoryNum) {
            winner = "You"
        }
        return (
            <div>
                <h2>
                    {winner} won the game!
                </h2>
            </div>
        )
    }

    function handleRematch() {
        window.location.reload()
    }


    return (
        <div>
            <h1>Playing a game!</h1>
            <h2>gameID: {gameID}</h2>
            <h3>Best {victoryNum} out of {totalThrows}</h3>
            <p>
                HOW TO PLAY: Click on any 1 of the buttons. Immediately after you click it,
                the AI player will randomly choose rock, paper, or scissors to play against you!
            </p>
            <hr />

            {renderPoints()}

            {renderThrows()}


            {someoneWon
                ?
                <div>
                    {declareWinner()}
                    <button onClick={handleRematch}>Rematch?</button>
                </div>
                :
                <div>
                    <button onClick={() => { handleThrow("ROCK") }}>ROCK</button>
                    <button onClick={() => { handleThrow("PAPER") }}>PAPER</button>
                    <button onClick={() => { handleThrow("SCISSORS") }}>SCISSORS</button>
                </div>
            }


        </div>
    )
}

export default GamePage