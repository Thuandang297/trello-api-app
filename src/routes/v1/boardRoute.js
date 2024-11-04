import express from 'express'
import { StatusCodes } from 'http-status-codes'
const boardRoute = express.Router()

boardRoute.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note, api get ok' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Note, api created' })
  })

export const BoardsRouter = boardRoute