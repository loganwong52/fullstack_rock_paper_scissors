// Render user's and computer's points
function DisplayPoints({ playerThrows, computerThrows }) {
    return (
        <div>
            <h3>POINTS</h3>
            You: {playerThrows}
            <br />
            Computer: {computerThrows}
            <hr />
        </div>
    )

}

export default DisplayPoints