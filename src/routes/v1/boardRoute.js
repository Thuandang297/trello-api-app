import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
const boardRoute = express.Router()

boardRoute.route('/')
  .post(boardValidation.createNew, boardController.createNew)
  .put(boardValidation.updateData, boardController.updateData)

export const BoardsRouter = boardRoute