import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import { columnService } from '~/services/columnService'
const createNew = async (req, res, next) => {
  try {
    const createdColumn= await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({ createdColumn })
  } catch (error) {
    next(error)
  }
}

const updateData = (req, res, next) => {
  try {
    res.status(StatusCodes.ACCEPTED).json({ Create: 'Update by controller nha' })
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

export const columnController = { createNew, updateData, findById }
