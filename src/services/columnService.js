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
    return await columnModel.deleteData(columnId)
  } catch (error) {
    throw error
  }
}

export const columnService ={
  createNew,
  updateData,
  deleteData
}