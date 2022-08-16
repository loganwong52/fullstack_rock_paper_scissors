import axios from 'axios'
import { useEffect, useState } from 'react'


function PlayerThrowButtons({ handleThrow }) {
    // image urls
    const [rockImageUrl, setRockImageUrl] = useState('')
    const [paperImageUrl, setPaperImageUrl] = useState('')
    const [scissorsImageUrl, setScissorsImageUrl] = useState('')

    // POKEMON IMAGE AXIOS STUFF
    // pokemon API: https://pokeapi.co/
    async function getData(pokemonName) {
        try {
            // get the sprite URL
            const jsonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            console.log(jsonResponse.data.sprites.other)
            let spriteUrl = jsonResponse.data.sprites.other['official-artwork'].front_default

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