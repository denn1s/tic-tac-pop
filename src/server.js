import { Server, Origins } from 'boardgame.io/server'
import Game from './Game'
import cors from 'koa-cors'

const server = Server({
  games: [Game],
  origins: [Origins.LOCALHOST, 'https://tic-tac-pop.onrender.com']
})

server.app.use(cors())

server.run(8000)
