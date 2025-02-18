import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import cloneDeep from 'lodash/cloneDeep'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { mapOrder } from '~/utils/sorts'

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

const updateBoard = async (req) => {
  // eslint-disable-next-line no-useless-catch
  try {
    req.body.slug = slugify(req?.body.title)
    return await boardModel.updateBoard(req)
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
    //Get cards of each column
    const cardsOfEachColumn = cards.filter(card => (card.columnId.equals(column._id)))
    const mapOrderedCards = mapOrder(cardsOfEachColumn, column.cardOrderIds, '_id')
    console.log("🚀 ~ findBoardById ~ mapOrderedCards:", mapOrderedCards)
    console.log("column.cardOrderIds", column.cardOrderIds);
    
    //Map the order by column.cardOrderIds
    column.cards = mapOrderedCards
  })
  delete response.cards
  return response
}

export const boardService = {
  createNew,
  updateBoard,
  findBoardById
}