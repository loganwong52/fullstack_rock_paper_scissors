function PlayerThrowButtons({ setPlayerRPS, playerThrows, setComputeRPS, setPlayerThrows, setComputerThrows, computerThrows, setRoundWinner }) {
    // computer's choices
    const computerChoices = ['ROCK', 'PAPER', 'SCISSORS']

    function handleThrow(userThrow) {
        console.log("Player's throw: ", userThrow)
        setPlayerRPS(userThrow)

        // computer throws ROCK, PAPER, OR SCISSORS
        let choice = Math.floor(Math.random() * 3)
        let computerThrow = computerChoices[choice]
        console.log("computer choice: ", computerThrow)
        setComputeRPS(computerThrow)

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


    return (
        <div>
            <button onClick={() => { handleThrow("ROCK") }}>ROCK</button>
            <button onClick={() => { handleThrow("PAPER") }}>PAPER</button>
            <button onClick={() => { handleThrow("SCISSORS") }}>SCISSORS</button>
        </div>
    )

}

export default PlayerThrowButtons