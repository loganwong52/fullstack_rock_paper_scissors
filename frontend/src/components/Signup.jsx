import { useState } from 'react'
import axios from 'axios'


function signup({ setSignedUp }) {


    const handleSubmit = (event) => {
        event.preventDefault()

        let name = event.target[0].value
        let email = event.target[1].value
        let password = event.target[2].value
        // get the user input
        console.log("SIGNUP SUBMITED: " + name, email, password)
        console.dir(event.target)


        // send the user input to backend
        axios.post('/signup', {
            'username': name,
            'email': email,
            'password': password,
        }).then((response) => {
            console.log(response.data)
            setSignedUp(true)
            // in here, you can do whatever you want...
            // reload the page, send them to another page, etc.
        })


    }

    return (
        <div>
            <h2>SIGN-UP:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default signup