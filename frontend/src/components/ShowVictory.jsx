function ShowVictory({ playerThrows, victoryNum, computerThrows }) {

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
            {declareWinner()}
            <button onClick={handleRematch}>Play again?</button>
        </div>
    )

}

export default ShowVictory