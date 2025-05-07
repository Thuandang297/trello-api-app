import { userModel } from '~/models/userModel'
import bcrypt from 'bcryptjs'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { uuid } from 'uuidv4'
import { pickUser } from '~/utils/formatter'
import { WEBSITE_DOMAIN } from '~/utils/constants'
import { BrevoProvider } from '~/providers/brevoProvider'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Check if the user email already exists
    const userByEmail = await userModel.findOneByEmail(reqBody.email)
    if (userByEmail) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
    }

    //Create data to save into database
    const hashedPassword = await bcrypt.hashSync(reqBody.password, 10)
    reqBody.password = hashedPassword
    reqBody.verifyToken = uuid()
    const newUser = await userModel.createNew(reqBody)
    //Send email to user


    const verficationLink = `${WEBSITE_DOMAIN}/account/verification?email=${newUser.email}&token=${newUser.verifyToken}`
    const customSubject = 'Trello Clone - Verify your email:Please verify your email address'
    const customHtml = `
    <h1>Verify your email address</h1>
    <p>Click the following link to verify your email address:</p>
    <a href="${verficationLink}">Verify your email address</a>
    <p>If you didn't create an account with Trello Clone, you can safely delete this email.</p>
    `
    //Return result
    BrevoProvider.sendEmail(newUser.email, customSubject, customHtml)
    return pickUser(newUser)
  } catch (error) {
    throw error
  }
}

const updateUser = async (userId, reqBody) => {
  //find user by id and update with
  return await userModel.updateData(userId, reqBody)
}

const changePassword = async (userId, reqBody) => {
  //find user
  const currentUser = await userModel.findOneById(userId)

  const { currentPassword, newPassword, confirmPassword } = reqBody

  //Check if newPassword and confirmPassword not correct
  if (newPassword !== confirmPassword) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'New password and confirm password not match, please check again!')
  }

  //Check password is correct
  if (!bcrypt.compareSync(currentPassword, currentUser.password)) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Password is not correct!')
  }

  //Hash newPassword
  const newHashedPassword = await bcrypt.hash(newPassword, 10)

  //Update password

  userModel.updateData(userId, { password: newHashedPassword })
}

const verify = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { email, token } = reqBody
    /*  Check basic condition
    Check email not exist in service
    Check verifycation not equal verifyToken in db
    Check if user had actived*/

    const existUser = await userModel.findOneByEmail(email)
    if (!existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    if (existUser.isActive) throw new ApiError(StatusCodes.FAILED_DEPENDENCY, 'User was actived!')
    if (token !== existUser.verifyToken) throw new ApiError(StatusCodes.FAILED_DEPENDENCY, 'Verify token is fail!')
    // Update data when verifired

    const updatedData = {
      isActive: true,
      verifyToken: null
    }

    const updatedUser = await userModel.updateData(existUser._id, updatedData)
    return pickUser(updatedUser)
  }
  catch (error) {
    throw error
  }
}

const login = async (reqBody) => {
  const { email, password } = reqBody
  /*  Check basic condition
  Check email not exist in service
  Check verifycation not equal verifyToken in db
  Check if user had actived*/

  const existUser = await userModel.findOneByEmail(email)

  if (!existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
  if (!existUser.isActive) throw new ApiError(StatusCodes.FAILED_DEPENDENCY, 'User has not actived, please active user before login!')
  if (!bcrypt.compareSync(password, existUser.password)) throw new ApiError(StatusCodes.FAILED_DEPENDENCY, 'Email or password not true!')

  const userInfo = { _id: existUser._id, email: existUser.email }
  //Create access token and user token to login with jsonwebtoken

  const accessToken = await JwtProvider.generateToken(
    userInfo, env.ACCESS_TOKEN_SECRET_SIGNATURE, env.ACCESS_TOKEN_LIFE
  )

  const refreshToken = await JwtProvider.generateToken(
    userInfo, env.REFRESH_TOKEN_SECRET_SIGNATURE, env.REFRESH_TOKEN_LIFE
  )
  //Return user information with two tokens has retured
  return { accessToken, refreshToken, ...pickUser(existUser) }
}

const getDetail = async (idUser) => {
  try {
    const result = await userModel.findOneById(idUser)
    return pickUser(result)
  } catch (error) {
    return error
  }
}

const refreshToken = async (refreshToken) => {
  //Giải mã refresh token vừa truyền vào xem có đúng không
  const decodedRefreshToken = await JwtProvider.verifiedToken(refreshToken, env.REFRESH_TOKEN_SECRET_SIGNATURE)
  //Lấy dữ liệu user luôn từ dữ liệu đã được giải mã bên trên
  const userData = {
    _id: decodedRefreshToken._id,
    email: decodedRefreshToken.email
  }

  //Từ dữ liệu vừa rồi tạo ra accessToken mới

  const accessToken = await JwtProvider.generateToken(userData, env.ACCESS_TOKEN_SECRET_SIGNATURE, env.ACCESS_TOKEN_LIFE)
  return { accessToken }
}

export const userService = {
  createNew,
  verify,
  login,
  getDetail,
  refreshToken,
  updateUser,
  changePassword
}