import { Server } from 'boardgame.io/server'
import Game from './Game'
import cors from 'koa-cors'

const server = Server({
  games: [Game],
  origins: ['*']
})

server.app.use(cors())

server.run(8000)
