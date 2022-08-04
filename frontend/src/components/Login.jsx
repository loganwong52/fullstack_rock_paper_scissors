import axios from 'axios'
import { useState, useEffect } from 'react'

function Login({ setSignedUp, setShowGameLink }) {
    const [clicked, setClicked] = useState(false)
    const [user, setUser] = useState(undefined)
    const [loggedIn, setLoggedIn] = useState(false)

    const [displayFailedLogin, setDisplayFailedLogin] = useState(false)


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


    // Actual Login frontend stuff
    const handleLogin = (event) => {
        event.preventDefault()

        let name = event.target[0].value
        let email = event.target[1].value
        let password = event.target[2].value
        // get the user input
        console.log("LOGIN SUBMITTED: " + name, email, password)
        // console.dir(event.target)

        axios.post('/login', {
            email: email,
            name: name,
            password: password,

        }).then((response) => {
            console.log('response from server: ', response)
            setLoggedIn(true)
            setDisplayFailedLogin(false)
            setShowGameLink(true)

        }).catch((error) => {
            // unsuccessful Login -> clear input boxes, display message!
            console.log("There was an error in your input: ", error)
            let nameInput = document.getElementById("name-input")
            nameInput.value = ""
            let emailInput = document.getElementById("email-input")
            emailInput.value = ""
            let pwInput = document.getElementById("password-input")
            pwInput.value = ""

            setDisplayFailedLogin(true)
        })
    }

    const logOut = function (event) {
        event.preventDefault()
        axios.post('/logout').then((response) => {
            console.log('response from server: ', response)
            setLoggedIn(false)
            setShowGameLink(false)
            whoAmI()
            // window.location.reload()
        })
    }

    const whoAmI = async () => {
        const response = await axios.get('/whoami')
        const user = response.data && response.data[0] && response.data[0].fields
        console.log('user from whoami? ', user, response)
        setUser(user)
    }

    // prints who's logged or undefined if no one
    useEffect(() => {
        whoAmI()
    }, [])

    // prints confirmation if a user is logged in or not
    useEffect(() => {
        console.log("A user is logged in: ", loggedIn)
    }, [loggedIn])

    // when a user has logged in, set logged in state to true
    useEffect(() => {
        // console.log(user)
        if (user !== null && user !== undefined) {
            setLoggedIn(true)
            setShowGameLink(true)
        }
    }, [user])

    return (
        <div>
            {
                loggedIn
                    ?
                    <button onClick={logOut}>
                        Logout
                    </button>
                    :
                    <div>
                        <h2>LOGIN:</h2>
                        {
                            displayFailedLogin &&
                            <h2>Your email or password was incorrect!</h2>
                        }
                        <form onSubmit={handleLogin} >
                            <label>
                                Name:
                                <input id="name-input" type="text" name="name" />
                            </label>
                            <br />
                            <label>
                                Email:
                                <input id="email-input" type="text" name="email" />
                            </label>
                            <br />
                            <label>
                                Password:
                                <input id="password-input" type="password" name="password" />
                            </label>
                            <br />
                            <input type="submit" value="Submit" />

                            <br />
                            <br />
                            {
                                !clicked &&
                                <button onClick={() => {
                                    setClicked(true)
                                    setSignedUp(true)
                                }}>
                                    New User? Sign up!
                                </button>
                            }
                        </form>
                    </div>
            }


        </div>
    )
}

export default Login