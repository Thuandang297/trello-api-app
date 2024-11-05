import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
const boardRoute = express.Router()

boardRoute.route('/')
  .post(boardValidation.createNew)
  .put(boardValidation.updateData)

export const BoardsRouter = boardRoute