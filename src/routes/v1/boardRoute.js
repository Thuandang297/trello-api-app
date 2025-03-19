import express from 'express'
import { boardController } from '~/controllers/boardController'
import authMiddleware from '~/middlewares/authMiddleware'
import { boardValidation } from '~/validations/boardValidation'
const boardRoute = express.Router()

boardRoute.route('/')
  .post(authMiddleware.isAuthorized, boardValidation.createNew, boardController.createNew)

boardRoute.route('/:id')
  .put(authMiddleware.isAuthorized, boardValidation.updateData, boardController.updateData)

boardRoute.route('/:id')
  .get(authMiddleware.isAuthorized, boardController.findById)
export const BoardsRouter = boardRoute