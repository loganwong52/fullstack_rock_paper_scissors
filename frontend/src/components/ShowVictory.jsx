import axios from 'axios'
import { useEffect, useState } from 'react'

function ShowVictory({ playerThrows, victoryNum, computerThrows }) {
    // state value for cat image URL
    const [catImageUrl, setCatImageUrl] = useState('')

    // Determin who the winner is, return appropiate victory message
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


    // gets random cat image
    // CAT IMAGE API: https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
    async function getData() {
        try {
            const jsonResponse = await axios.get('https://api.thecatapi.com/v1/images/search')
            let imageUrl = jsonResponse.data[0].url
            // console.log(imageUrl)
            setCatImageUrl(imageUrl)

        } catch (error) {
            console.error('Error occurred fetching data: ', error)
        }

    }

    // on mount, get a random cat image
    useEffect(() => {
        getData()

    }, [])

    // reloads the page, appears once someone has won
    function handleRematch() {
        window.location.reload()
    }

    return (
        <div>
            {declareWinner()}
            <img src={catImageUrl} alt='cat image' />
            <br />

            <button onClick={handleRematch}>Play again?</button>
        </div>
    )

}

export default ShowVictory