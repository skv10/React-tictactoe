// import './App.css';
// import Square from './components/Square';
import { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';
import './style.scss'


const new_game = [{squares:Array(9).fill(null),isXNext:false}];

function App() {

  const [history,setHistory]=useState(new_game);
    
  const [currentMove,setCurrentMove]=useState(0);

  const gamingBoard = history[currentMove];

  const {winner,winningSquares} = calculateWinner(gamingBoard.squares);


  console.log(winner);

  const handleSquareClick = (clickedPosition) =>{

      if(gamingBoard.squares[clickedPosition] || winner){
          return;
      }



    setHistory(currentHistory =>{

      const isTraversing = currentMove+1 !== currentHistory.length;

      const lastGamingState = isTraversing ? currentHistory[currentMove]:history[history.length - 1];

      const nextSquareState = lastGamingState.squares.map((squarevalue,position) => {
        
          if(clickedPosition === position){
              return lastGamingState.isXNext ?'X':'0';
          }

          return squarevalue;
    });

    const base = isTraversing ? currentHistory.slice(0,currentHistory.indexOf(lastGamingState+1))
    :currentHistory;

    return base.concat({squares:nextSquareState,isXNext:!lastGamingState.isXNext})

    });

    setCurrentMove(move => move+1);
  };

  const moveTo = (move) => {
  setCurrentMove(move);
  };

  const onNewGameStart = ()=>{
   setHistory(new_game);
   setCurrentMove(0);
  }


  return (
    <div className='app'>

      <h1>TIC <span className='text-green'>TAC </span>TOE</h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board winningSquares = {winningSquares} squares={gamingBoard.squares} handleSquareClick={handleSquareClick}/>

      <button type='button'  className={`btn-reset ${winner?'active':''}`} onClick={onNewGameStart}>Start new game</button>

      <h2>Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
}

export default App;
