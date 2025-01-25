import React from 'react'
import { Client } from 'boardgame.io/react'
import Game from './Game'
import Board from './Board'

const GameClient = Client({
  game: Game,
  board: Board,
})

const App = () => {
  return (
    <GameClient />
  )
}

export default App
