import { StatusCodes } from 'http-status-codes'

const createNew = (req, res) => {
  try {
    res.status(StatusCodes.CREATED).json({ Create: 'Create by controller nha' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: new Error(error) })
  }
}

const updateData = (req, res) => {
  try {
    res.status(StatusCodes.CREATED).json({ Create: 'Update by controller nha' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: new Error(error) })
  }
}

export const boardController = { createNew, updateData }
