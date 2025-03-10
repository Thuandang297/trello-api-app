import { userModel } from '~/models/userModel'
import bcrypt from 'bcryptjs'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { uuid } from 'uuidv4'
import { pickUser } from '~/utils/formatter'
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

    //Return result
    return pickUser(newUser)
  } catch (error) {
    throw error }
}

export const userService = {
  createNew
}