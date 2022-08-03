// Tells the user instructions on what to input for total throws
// and the win condition. Has a form for user input.
// submit button calls the prop, handleSubmit.
function CreateGame({ handleSubmit }) {
    return (
        <div>
            <p>
                Please enter numbers that are greater than 3 or 2!
                <br />
                The total number should be greater than or equal to the number of throws to win.
                <br />
                Ex: best 2 out of 3
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2 className='best-out-of'> {"Best "}</h2>
                    <input id="victory-num" type="text" name="name" />
                </label>
                <label>
                    <h2 className='best-out-of'>{" out of "}</h2>
                    <input id="total-throws" type="text" name="email" />
                </label>
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default CreateGame