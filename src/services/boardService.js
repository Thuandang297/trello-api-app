import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import cloneDeep from 'lodash/cloneDeep'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody?.title)
    }
    return await boardModel.createNew(newBoard)
  } catch (error) {
    throw error
  }
}

const updateBoard = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody?.title)
    }
    return await boardModel.updateBoard(newBoard)
  } catch (error) {
    throw error
  }
}

const findBoardById = async (boardId) => {
  const boardDetail = await boardModel.getDetails(boardId)
  if (!boardDetail) throw new ApiError(StatusCodes.NOT_FOUND, 'Can not find the board')
  const response = cloneDeep(boardDetail)
  const { cards } = response
  response.columns.forEach(column => {
    column.cards = cards.filter(card => (card.columnId.equals(column._id)))
  })
  delete response.cards
  return response
}

export const boardService = {
  createNew,
  updateBoard,
  findBoardById
}