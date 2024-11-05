import express from 'express'
import { BoardsRouter } from './boardRoute'
const routes = express.Router()

//Check api board
routes.use('/boards', BoardsRouter)

export const APIs_v1 = routes