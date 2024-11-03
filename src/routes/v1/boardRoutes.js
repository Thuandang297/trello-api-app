import express from 'express'
import { StatusCodes } from 'http-status-codes'
const routes = express.Router()

routes.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note, api get ok' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Note, api created' })
  })

export const BoardsRouter = routes