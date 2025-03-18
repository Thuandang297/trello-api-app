import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import  authMiddleware   from '~/middlewares/authMiddleware'
import { StatusCodes } from 'http-status-codes'
const boardRoute = express.Router()

boardRoute.route('/')
  .post(authMiddleware.isAuthorized, boardValidation.createNew, boardController.createNew)

boardRoute.route('/:id')
  .put(authMiddleware.isAuthorized ,boardValidation.updateData, boardController.updateData)

boardRoute.route('/:id')
  .get(authMiddleware.isAuthorized, boardController.findById)
export const BoardsRouter = boardRoute