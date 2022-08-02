import axios from 'axios'
import { useState, useEffect } from 'react'

function Login({ setSignedUp }) {
    const [clicked, setClicked] = useState(false)
    const [user, setUser] = useState(null)

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'))

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn)
    }, [loggedIn])


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


    const handleLogin = (event) => {
        event.preventDefault()

        let name = event.target[0].value
        let email = event.target[1].value
        let password = event.target[2].value
        // get the user input
        console.log("LOGIN SUBMITTED: " + name, email, password)
        console.dir(event.target)

        axios.post('/login', {
            email: email,
            name: name,
            password: password,

        }).then((response) => {
            console.log('response from server: ', response)
            setLoggedIn(true)
            window.location.reload()
            // redirect to Rock paper Scissors later...
        })
    }

    const logOut = function (event) {
        event.preventDefault()
        axios.post('/logout').then((response) => {
            console.log('response from server: ', response)
            setLoggedIn('false')
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

    useEffect(() => {
        whoAmI()
    }, [])

    useEffect(() => {
        console.log(loggedIn)
    }, [loggedIn])

    return (
        <div>
            <h2>LOGIN:</h2>
            <form onSubmit={handleLogin} >
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

            {
                loggedIn !== 'false' && loggedIn !== null &&
                <button onClick={logOut}>
                    Logout
                </button>
            }
        </div>
    )
}

export default Login