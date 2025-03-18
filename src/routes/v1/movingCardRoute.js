import express from 'express'
import { movingCardValidation } from '~/validations/movingCardValidation'
import { movingCardController } from '~/controllers/movingCardController'
import  authMiddleware   from '~/middlewares/authMiddleware'

const movingCardRouter = express.Router()

movingCardRouter.route('/')
  .put(authMiddleware.isAuthorized, movingCardValidation.movingCard, movingCardController.movingCard)
export const MovingCardsRouter = movingCardRouter