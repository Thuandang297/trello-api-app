import express from 'express'
import { movingCardValidation } from '~/validations/movingCardValidation'
import { movingCardController } from '~/controllers/movingCardController'
const movingCardRouter = express.Router()

movingCardRouter.route('/')
  .put(movingCardValidation.movingCard, movingCardController.movingCard)
export const MovingCardsRouter = movingCardRouter