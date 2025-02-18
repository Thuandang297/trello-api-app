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
    return await columnModel.updateData(req)
  } catch (error) {
    throw error
  }
}

export const columnService ={
  createNew,
  updateData
}