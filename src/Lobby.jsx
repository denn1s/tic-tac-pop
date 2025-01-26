import React, { useState, useEffect } from 'react'
import { LobbyClient } from 'boardgame.io/client'

const lobbyClient = new LobbyClient({ server: import.meta.env.VITE_SERVER })

const Lobby = ({ join }) => {
  const [game, setgame] = useState(
    new URLSearchParams(window.location.search).get('game') || ''
  )
  const [waiting, setwaiting] = useState({})
  const [loading, setloading] = useState(false)
  const shareURL = `${window.location.href}?game=${waiting.matchID}`

  const createGame = async () => {
    if (loading) return
    setloading(true)
    try {
      const playerID = "0"
      const playerName = "Red"
      const { matchID } = await lobbyClient.createMatch('tic-tac-pop', { numPlayers: 2 })
      const { playerCredentials } = await lobbyClient.joinMatch('tic-tac-pop', matchID, { playerID, playerName }) 
      setwaiting({ matchID, playerCredentials, playerID, playerName })
    } catch (error) {
      console.error('Error creating game:', error)
    } finally {
      setloading(false)
    }
  }

  const joinGame = async () => {
    if (loading) return
    setloading(true)
    try {
      const playerID = "1"
      const playerName = "Blue"
      const { playerCredentials } = await lobbyClient.joinMatch('tic-tac-pop', game, { playerID, playerName }) 
      join(game, playerID, playerCredentials)
    } catch (error) {
      console.error('Error joining game:', error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    let interval
    if (waiting.matchID) {
      const checkPlayers = async () => {
        const { players } = await lobbyClient.getMatch('tic-tac-pop', waiting.matchID)
        if (players.filter(p => p.name).length === 2) {
          join(waiting.matchID, waiting.playerID, waiting.playerCredentials)
        }
      }
      interval = setInterval(checkPlayers, 1000)
    }

    return () => clearInterval(interval)
  }, [waiting.matchID])

  if (waiting.matchID) {
    return (
      <div className="p-4 w-screen h-screen board flex flex-col items-center pt-30 shadows">
        <img src="/title.webp" className="w-100" />
        <h1 className="text-2xl -mt-8 mb-12 font-bold">Waiting Room</h1>
        <div className="mb-4 w-80 text-sky-900">
          <h3 className="font-bold">Players</h3>
          <ol className="list-decimal list-inside">
            <li>Player 1: (you)</li>
            <li>Player 2: Waiting for player...</li>
          </ol>
        </div>
        <div className="mb-4 w-80 text-sky-800">
          <h3 className="font-bold">Room</h3>
          <ul className="list-decimal list-inside">
            <li>Code: {waiting.matchID}</li>
            <li onClick={() => navigator?.clipboard?.writeText(shareURL)} title="Click to copy">Share: <a href={`${window.location.href}?game=${waiting.matchID}`} onClick={e => e.preventDefault()}>copy</a></li>
          </ul>
        </div>
      </div>
    ) 
  }

  return (
    <div className="w-screen h-screen board flex flex-col items-center shadows pt-30">
      <img src="/title.webp" className="w-100" />
      <h1 className="text-2xl -mt-8 mb-12 font-bold text-sky-800">Lobby</h1>
      <div className="mb-4 flex h-12 w-80">
        <input
          type="text"
          value={game}
          onChange={({ target: { value }}) => setgame(value)}
          className="border border-sky-800 bg-white px-4 py-2 flex-grow"
        />
        <button
          className="bg-sky-600 border border-sky-800 text-white px-1 py-2 mb-4 h-full"
          onClick={joinGame}
        >
          Join Game
        </button>
      </div>

      <div className="mb-4 flex h-12 w-80">
        <button
          className="w-full h-full bg-violet-400 border border-violet-800 text-white px-4 py-2 mb-4"
          onClick={createGame}
        >
          Create Game
        </button>
      </div>
    </div>
  )
}

export default Lobby

