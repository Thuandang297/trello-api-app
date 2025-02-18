import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    const createdBoard= await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({ createdBoard })
  } catch (error) {
    next(error)
  }
}

const updateData = async (req, res, next) => {
  try {
    const updatedBoard = await boardService.updateBoard(req)
    res.status(StatusCodes.OK).json({ updatedBoard })
  } catch (error) {next(error)}
}

const findById = async (req, res, next) => {
  try {
    const boardId=req.params.id
    const dataBoard = await boardService.findBoardById(boardId)
    if (!dataBoard) {
      throw new Error(StatusCodes.NOT_FOUND, 'Board is not found!')
    }
    res.status(StatusCodes.OK).json({ dataBoard })
  } catch (error) {
    next(error)
  }
}

export const boardController = { createNew, updateData, findById }
