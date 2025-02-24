import { movingCardModel } from '~/models/moveCardModel'

const movingCard = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await movingCardModel.movingCard(reqBody)
  } catch (error) {
    throw error
  }
}

export const movingCardService ={
  movingCard
}