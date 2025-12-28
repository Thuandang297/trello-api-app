import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import { PAGE_DEFAULT, SIZE_DEFAULT } from '~/utils/constants'
import ListResponse from '~/utils/ListResponse'
import { successResponse } from '~/utils/responseHelper'
const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body)
    return successResponse(res, createdBoard, StatusCodes.CREATED, 'Create board successfully')
  } catch (error) {
    next(error)
  }
}

const getBoards = async (req, res, next) => {
  try {
    const { _id: userId } = req.jwtDecoder
    if (!userId) {
      throw new Error(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }
    const { page, limit } = req.query
    const pageNumber = parseInt(page) || PAGE_DEFAULT
    const limitNumber = parseInt(limit) || SIZE_DEFAULT
    const boards = await boardService.getAllBoards(userId, pageNumber, limitNumber)
    if (!boards) {
      throw new Error(StatusCodes.NOT_FOUND, 'Can not find the boards')
    }
    const dataBoard = new ListResponse(boards, 8, pageNumber, limitNumber)
    if (!dataBoard || dataBoard.items.length === 0) {
      return successResponse(res, [], StatusCodes.OK, 'No boards found')
    }
    return successResponse(res, dataBoard, StatusCodes.OK, 'Successfully retrieved boards')

  } catch (error) {
    next(error)
  }
}

const updateData = async (req, res, next) => {
  try {
    const updatedBoard = await boardService.updateBoard(req)
    res.status(StatusCodes.OK).json({ updatedBoard })
  } catch (error) { next(error) }
}

const findById = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const dataBoard = await boardService.findBoardById(boardId)
    if (!dataBoard) {
      throw new Error(StatusCodes.NOT_FOUND, 'Board is not found!')
    }
    res.status(StatusCodes.OK).json({ dataBoard })
  } catch (error) {
    next(error)
  }
}

export const boardController = { createNew, updateData, findById, getBoards }
