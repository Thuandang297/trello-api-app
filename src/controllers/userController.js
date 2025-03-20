import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'
import ms from 'ms'
import ApiError from '~/utils/ApiError'
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
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      sercure: true,
      sameSide: 'none',
      maxAge: ms('14 days')
    })

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      sercure: true,
      sameSide: 'none',
      maxAge: ms('14 days')
    })
    res.status(StatusCodes.ACCEPTED).json({ ...result })
    //Xử lý cookie trả về cho trình duyệt
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

const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(StatusCodes.OK).json({ logout:true })
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const result = await userService.refreshToken(req.cookies?.refreshToken)
    //Thực hiện lưu cookie
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      sercure: true,
      sameSide: 'none',
      maxAge: ms('14 day')
    })
    res.status(StatusCodes.ACCEPTED).json({ ...result })
    //Xử lý cookie trả về cho trình duyệt
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Please sign in!'))
  }
}
export const userController = { createNew, verify, login, getUserDetail, logout, refreshToken }
