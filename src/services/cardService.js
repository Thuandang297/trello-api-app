import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCard={
      ...reqBody
    }
    return await cardModel.createNew(newCard)
  } catch (error) {
    throw error
  }
}

const updateData = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedCard = {
      ...reqBody
    }
    return await cardModel.updateData(updatedCard)
  } catch (error) {
    throw error
  }
}

export const cardService ={
  createNew,
  updateData
}