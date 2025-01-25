import React from 'react'

const Board = ({ G, ctx, moves, isActive }) => {
  const willPopNext = ctx.turn - 6
  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center board`}>
<img src="/title.webp" className="w-100" />
      <div className="grid grid-cols-3 gap-4 main-grid">
        {G.cells.map((cell, index) => (
          <button
            key={index}
            className={`
w-24 h-24 
${cell.turn === willPopNext ? 'blink' : ''}
${cell.index === G.pop ? 'pop' : ''}
${cell.value === "0" ? "bubble x" : ""}
${cell.value === "1" ? "bubble o" : ""}
`}
            onClick={() => moves.clickCell(index)}
          />
        ))}
      </div>
      {ctx.gameover?.winner ? (
        <div className="mt-4 text-center text-4xl font-bold text-sky-800">
         {ctx.gameover.winner === "0" ? "X" : "O"} wins! 
        </div> 
      ) : (
     <div className="mt-4 text-center text-4xl font-bold text-sky-800">
         {ctx.currentPlayer === "0" ? "X" : "O"}'s turn 
        </div> 
      )}
    </div>
  )
}

export default Board
