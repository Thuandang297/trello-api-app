import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'
import authMiddleware from '~/middlewares/authMiddleware'

const cardRouter = express.Router()

cardRouter.route('/')
  .post(authMiddleware.isAuthorized, cardValidation.createNew, cardController.createNew)
  .put(authMiddleware.isAuthorized, cardValidation.updateData, cardController.updateData)

export const CardsRouter = cardRouter