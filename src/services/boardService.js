import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard={
      ...reqBody,
      slug: slugify(reqBody?.title)
    }
    const createdBoard =await boardModel.createNew(newBoard)
    const resultCreated = await boardModel.findById(createdBoard.insertedId)
    return resultCreated
  } catch (error) {
    throw error
  }
}

const findBoardById = async (boardId) => {
  return await boardModel.getDetails(boardId)
}

export const boardService ={
  createNew,
  findBoardById
}