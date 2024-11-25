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

const updateData = (req, res, next) => {
  try {
    res.status(StatusCodes.ACCEPTED).json({ Create: 'Update by controller nha' })
  } catch (error) {next(error)}
}

const findById = async (req, res, next) => {
  try {
    const dataBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.OK).json({ dataBoard })
  } catch (error) {
    next(error)
  }
}

export const boardController = { createNew, updateData, findById }
