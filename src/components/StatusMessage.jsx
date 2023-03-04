const StatusMessage = ({winner,gamingBoard}) =>{

    const { squares,isXNext} = gamingBoard;

    const noMovesLeft = squares.every((squarevalue) =>squarevalue !== null );
    
    const nextPlayer = isXNext ? 'X':'0';
    // const statusMessage = winner ? `Winner is: ${winner}`:`next player is : ${nextPlayer}`


    const renderStatusMessage = () =>{
        if(winner){
            return <div >Winner is: {winner}</div>;
        }

        if(!winner && noMovesLeft){
            return <div><span className="text-orange">0</span> and <span className="text-green">X</span>Tied</div>;
        }

        if(!winner && !noMovesLeft){
            return <>Next player is : 
                <span className={isXNext ?'text-green':'text-orange'}>{nextPlayer}</span>
                </>;
        }
        return null;
    }
    return <h2 className="status-message">
       {renderStatusMessage()}
    </h2>
}

export default StatusMessage;