import axios from 'axios'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useEffect, useState } from 'react'

function HomePage() {

    const handleSubmit = (event) => {
        event.preventDefault()

        let victoryNumber = event.target[1].value
        let totalThrows = event.target[0].value

        // get the user input
        console.log("NEW GAME INPUT: ", victoryNumber, totalThrows)
        console.dir(event.target)

        return null
    }

    return (
        <div>
            <h1>Start a new game!</h1>
            <hr />

            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter total number of throws to play:
                        <input id="total-throws" type="text" name="name" />
                    </label>
                    <br />
                    <br />
                    <label>
                        Enter number of throws to win:
                        <input id="victor-num" type="text" name="email" />
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>



        </div>
    )
}

export default HomePage