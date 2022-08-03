// Render player's choice & computer's choice
function DisplayThrows({ playerRPS, computerRPS, roundWinner }) {
    return (
        <div>
            <h3>You threw: {playerRPS}</h3>
            <h3>Computer threw: {computerRPS}</h3>
            <h3>{roundWinner}</h3>
        </div>
    )

}

export default DisplayThrows