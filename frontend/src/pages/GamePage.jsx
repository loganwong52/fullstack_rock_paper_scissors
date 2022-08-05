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

    // computer's choices
    const computerChoices = ['ROCK', 'PAPER', 'SCISSORS']

    // string that keeps track of player's & computer's throws: either ROCK, PAPER, or SCISSORS
    const [playerRPS, setPlayerRPS] = useState('')
    const [computerRPS, setComputerRPS] = useState('')
    // displays who won this round
    const [roundWinner, setRoundWinner] = useState('')
    // string that is either YOU or THE COMPUTER when someone wins
    const [someoneWon, setSomeoneWon] = useState(false)

    // integer that represents how many throws they've won
    const [playerThrows, setPlayerThrows] = useState(0)
    const [computerThrows, setComputerThrows] = useState(0)

    // boolean that determines whether to show throws or not
    const [gameHasStarted, setGameHasStarted] = useState(false)


    // When a button is pressed, determines who wins the throw, or if it's a TIE
    function handleThrow(userThrow) {
        console.log("Player's throw: ", userThrow)
        setPlayerRPS(userThrow)

        // computer throws ROCK, PAPER, OR SCISSORS
        let choice = Math.floor(Math.random() * 3)
        let computerThrow = computerChoices[choice]
        console.log("computer choice: ", computerThrow)
        setComputerRPS(computerThrow)

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


    // on mount, axios get the game, given the ID
    useEffect(() => {
        axios.get(`/game/${gameID}`).then((response) => {
            // console.log(response)

            // set the 2 state values
            setTotalThrows(response.data.total_throws)
            setVictoryNum(response.data.victory_num)
        })

    }, [])


    // when playerThrows and computerThrows are both updated, print!
    // OR if the first throw is a TIE, since the playerThrows & computerThrows might not be updated
    useEffect(() => {
        console.log("Player's throws won: ", playerThrows)
        console.log("Computer's  throws won: ", computerThrows)

        // once you or computer has 1 point, display throws!
        if (roundWinner === "TIE!" || playerThrows > 0 || computerThrows > 0) {
            setGameHasStarted(true)
        }

        if (playerThrows === victoryNum || computerThrows === victoryNum) {
            setSomeoneWon(true)
        }

    }, [roundWinner, playerThrows, computerThrows])


    return (
        <div>
            <h1 >Playing a game!</h1>
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

            {
                gameHasStarted
                && <DisplayThrows playerRPS={playerRPS} computerRPS={computerRPS} roundWinner={roundWinner} />
            }


            {someoneWon
                ? <ShowVictory playerThrows={playerThrows} victoryNum={victoryNum} computerThrows={computerThrows} />
                : <PlayerThrowButtons handleThrow={handleThrow} />
            }

        </div>
    )
}

export default GamePage