import { cardModel } from './cardModel'
import { columnModel } from './columnModel'

const movingCard = async (data) => {
  try {
    const {
      cardId,
      dropColumnId,
      dragColumnId,
      dragListCardIds,
      dropListCardIds
    } = data
    //1.Update data of drag column
    columnModel.updateCardOrderIds(dragColumnId, dragListCardIds)
    //2.Update data of drop column
    columnModel.updateCardOrderIds(dropColumnId, dropListCardIds)
    //3.Update data of moving card
    cardModel.movingCard(cardId, dropColumnId)
  } catch (error) {
    throw new Error(error)
  }
}

export const movingCardModel = {
  movingCard
}