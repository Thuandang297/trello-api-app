import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import { columnService } from '~/services/columnService'
const createNew = async (req, res, next) => {
  try {
    const createdColumn= await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({ ...createdColumn })
  } catch (error) {
    next(error)
  }
}

const updateData = async (req, res, next) => {
  try {
    const updatedColumn = await columnService.updateData(req)
    res.status(StatusCodes.ACCEPTED).json({ ...updatedColumn })
  } catch (error) {next(error)}
}

const deleteData = async (req, res, next) => {
  try {
    const columnId=req.params.id
    const response = await columnService.deleteData(columnId)
    res.status(StatusCodes.ACCEPTED).json({ ...response })
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

export const columnController = { createNew, updateData, findById, deleteData }
