import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
const boardRoute = express.Router()

boardRoute.route('/')
  .post(boardValidation.createNew, boardController.createNew)

boardRoute.route('/:id')
  .put(boardValidation.updateData, boardController.updateData)

boardRoute.route('/:id')
  .get(boardController.findById)
export const BoardsRouter = boardRoute