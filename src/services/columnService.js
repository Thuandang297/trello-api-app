import { ObjectId } from 'mongodb'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColumn={
      ...reqBody
    }
    return await columnModel.createNew(newColumn)
  } catch (error) {
    throw error
  }
}

const updateData = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updatedColumn = {
      ...reqBody
      // boardId: new ObjectId(reqBody.boardId)
    }
    return await columnModel.updateData(updatedColumn)
  } catch (error) {
    throw error
  }
}

export const columnService ={
  createNew,
  updateData
}