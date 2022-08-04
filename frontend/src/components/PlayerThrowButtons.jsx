import axios from 'axios'
import { useEffect, useState } from 'react'


function PlayerThrowButtons({ setPlayerRPS, playerThrows, setComputerRPS, setPlayerThrows, setComputerThrows, computerThrows, setRoundWinner }) {
    // computer's choices
    const computerChoices = ['ROCK', 'PAPER', 'SCISSORS']

    // image urls
    const [rockImageUrl, setRockImageUrl] = useState('')
    const [paperImageUrl, setPaperImageUrl] = useState('')
    const [scissorsImageUrl, setScissorsImageUrl] = useState('')

    // Determines who wins the throw, or if it's a TIE
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


    // POKEMON IMAGE AXIOS STUFF
    // pokemon API: https://pokeapi.co/
    async function getData(pokemonName) {
        try {
            // get the sprite URL
            const jsonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            let spriteUrl = jsonResponse.data.sprites.front_default

            // depending on the name, set appropiate state
            if (pokemonName === 'geodude') {
                setRockImageUrl(spriteUrl)

            } else if (pokemonName === 'kartana') {
                setPaperImageUrl(spriteUrl)

            } else if (pokemonName === 'scizor') {
                setScissorsImageUrl(spriteUrl)

            } else {
                alert(`${pokemonName} is invalid...`)
                return
            }
            // console.log(spriteUrl)

        } catch (error) {
            console.error('Error occurred fetching data: ', error)
        }

    }

    // on mount, get the images for the buttons
    useEffect(() => {
        getData('geodude')
        getData('kartana')
        getData('scizor')
    }, [])


    // render the 3 buttons with respective image
    return (
        <div>
            <button className='pokemon-button' title="Geodude" onClick={() => { handleThrow("ROCK") }}>
                <img src={rockImageUrl} alt='ROCK' />
                <p className='poke-button-desc'>ROCK</p>
            </button>
            <button className='pokemon-button' title="Kartana" onClick={() => { handleThrow("PAPER") }}>
                <img src={paperImageUrl} alt='PAPER' />
                <p className='poke-button-desc'>PAPER</p>
            </button>
            <button className='pokemon-button' title="Scizor" onClick={() => { handleThrow("SCISSORS") }}>
                <img src={scissorsImageUrl} alt='SCISSORS' />
                <p className='poke-button-desc'>SCISSORS</p>
            </button>
        </div>
    )

}

export default PlayerThrowButtons