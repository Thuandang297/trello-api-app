import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await columnModel.createNew(reqBody)
  } catch (error) {
    throw error
  }
}

const updateData = async (req) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const columnId = req.params.id
    const body = req.body
    return await columnModel.updateData(columnId, body)
  } catch (error) {
    throw error
  }
}

const deleteData = async (columnId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Delete card of column
    await cardModel.deleteManyCardByColumnId(columnId)

    //Delete column
    await columnModel.deleteData(columnId)

    const columnData = await columnModel.getDetails(columnId)
    const boardId = columnData.boardId
    //Delete columnId in orderedColumnIds
    await boardModel.pullColumnIdInBoard(boardId, columnId)
  } catch (error) {
    throw error
  }
}

const getDetails = async (columnId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await columnModel.getDetails(columnId)
  } catch (error) {
    throw error
  }
}

export const columnService ={
  createNew,
  updateData,
  deleteData,
  getDetails
}