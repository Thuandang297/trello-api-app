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
    columnModel.updateData(dragColumnId, { cardOrderIds : dragListCardIds })
    //2.Update data of drop column
    columnModel.updateData(dropColumnId, { cardOrderIds : dropListCardIds })
    //3.Update data of moving card
    cardModel.updateData(cardId, { columnId : dropColumnId })

    return 'Success'
  } catch (error) {
    throw new Error(error)
  }
}

export const movingCardModel = {
  movingCard
}