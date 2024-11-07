import { StatusCodes } from 'http-status-codes'
const createNew = (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json({ Create: 'Create by controller nha' })
  } catch (error) {
    next(error)
  }
}

const updateData = (req, res, next) => {
  try {
    res.status(StatusCodes.ACCEPTED).json({ Create: 'Update by controller nha' })
  } catch (error) {next(error)}
}

export const boardController = { createNew, updateData }
