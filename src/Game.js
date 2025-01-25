function bubble(cells, value, turn, index) {
  const clicked = cells
    .filter(item => item.value === value)
    .sort((a, b) => a.turn - b.turn)
    .map(item => item.index)

  let oldest = null
  if (clicked.length >= 3) {
    oldest = clicked[0]
    cells[oldest] = { value: null, turn: null, index: oldest} 
  }
  cells[index] = { value, turn, index }
  return oldest
}

const Game = {
  name: 'tic-tac-pop',
  setup: () => ({
    cells: Array(9)
      .fill()
      .map((_, index) => ({ value: null, index, turn: null })),
    pop: null
  }),
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  moves: {
    clickCell: ({ G, ctx, playerID }, index) => {
      if (G.cells[index].value === null) {
        // G.cells[index].value = playerID
        G.pop = bubble(G.cells, playerID, ctx.turn, index)
      }
    }
  },
  endIf: ({ G, ctx }) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let condition of winConditions) {
      const [a, b, c] = condition
      if (G.cells[a].value && G.cells[a].value === G.cells[b].value && G.cells[a].value === G.cells[c].value) {
        return { winner: ctx.currentPlayer }
      }
    }
  }
}

export default Game
