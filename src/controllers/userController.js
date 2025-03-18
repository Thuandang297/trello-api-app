import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'
const createNew = async (req, res, next) => {
  try {
    const createdUser= await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({ ...createdUser })
  } catch (error) {
    next(error)
  }
}

const verify = async (req, res, next) => {
  try {
    const createdUser = await userService.verify(req.body)
    res.status(StatusCodes.ACCEPTED).json({ ...createdUser })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)
    //Thực hiện lưu cookie
    res.status(StatusCodes.ACCEPTED).json({ ...result })
  } catch (error) {
    next(error)
  }
}

const getUserDetail = async (req, res, next) => {
  try {
    const result = await userService.getDetail(req.params.id)
    //Thực hiện lưu cookie
    res.status(StatusCodes.ACCEPTED).json({ ...result })
  } catch (error) {
    next(error)
  }
}
export const userController = { createNew, verify, login, getUserDetail }
