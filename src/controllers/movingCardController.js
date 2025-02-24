import { StatusCodes } from 'http-status-codes'
import { movingCardService } from '~/services/movingCardService'
const movingCard = async (req, res, next) => {
  try {
    const response = await movingCardService.movingCard(req.body)
    res.status(StatusCodes.ACCEPTED).json({ response })
  } catch (error) {
    next(error)
  }
}

export const movingCardController = { movingCard }
