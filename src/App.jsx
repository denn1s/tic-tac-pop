import React, { useState } from 'react'
import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import Game from './Game'
import Board from './Board'
import Lobby from './Lobby'

const GameClient = Client({
  game: Game,
  board: Board,
  multiplayer: SocketIO({ server: import.meta.env.VITE_SERVER })
})

const App = () => {
  const [gameState, setgameState] = useState({})

  const join = (matchID, playerID, credentials) => setgameState({ matchID, playerID, credentials })

  if (!gameState.matchID) {
    return <Lobby join={join} />
  }

  return (
    <GameClient {...gameState} />
  )
}

export default App
