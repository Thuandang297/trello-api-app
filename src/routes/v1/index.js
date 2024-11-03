import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { BoardsRouter } from './boardRoutes'
const routes = express.Router()

//Check api v1 status
routes.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready use.' })
})

//Check api board

routes.use('/boards', BoardsRouter)

export const APIs_v1 = routes