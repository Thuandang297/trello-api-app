import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await cardModel.createNew(reqBody)
  } catch (error) {
    throw error
  }
}

const updateData = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await cardModel.updateData(reqBody)
  } catch (error) {
    throw error
  }
}

export const cardService ={
  createNew,
  updateData
}