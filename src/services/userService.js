import { userModel } from '~/models/userModel'
import bcrypt from 'bcryptjs'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { uuid } from 'uuidv4'
import { pickUser } from '~/utils/formatter'
import { WEBSITE_DOMAIN } from '~/utils/constants'
import { BrevoProvider } from '~/providers/brevoProvider'
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
    const customSubject ='Trello Clone - Verify your email:Please verify your email address'
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
    throw error }
}

export const userService = {
  createNew
}