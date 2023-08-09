import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants'
import { Winner } from './components/Winner'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import confetti from 'canvas-confetti'
import './App.css'
import { saveGame, resetGame } from './logic/storage/storage'


function App() {

  const [board, setBoard] = useState( () => {
    const storageBoard = localStorage.getItem("tablero")
    return storageBoard ? JSON.parse(storageBoard) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState( () => {
    const storageTurn = localStorage.getItem("turn")
    return storageTurn ?? TURNS.X
  })

  const [winner, setWinner] = useState( null )


  const updateBoard = (index) => {
    //Si ya tiene valor, no actualizamos
    if(board[index] || winner) return 
    
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard( newBoard ) 

    const newTurn  = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn( newTurn )

    // Guardado de partida
    saveGame({ board: newBoard, turn: newTurn })

    // Comprobar jugada
    const newWinner = checkWinnerFrom(newBoard)
    if( newWinner ){
      confetti()
      setWinner( newWinner )
    } else if( checkEndGame(newBoard)){
      setWinner(false)
    }

  }

  const resetGame = () => {
    setBoard(Array(9).fill( null ) )
    setTurn( TURNS.X )
    setWinner(null)

    resetGame()
  }

  return (
    <>
      <main className="board">
        <h1>3 EN RAYA</h1>
        <button onClick={resetGame}>Reset</button>
        <section className="game">
          {
            board.map((square, index) => {
              return (
                <Square 
                  key={index}
                  index={index} 
                  updateBoard={updateBoard}
                  >
                    {square}
                  </Square>
              )
            })
          }
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

        <Winner resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
