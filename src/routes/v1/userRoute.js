import express from 'express'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'
const userRoute = express.Router()
userRoute.route('/register')
  .post(userValidation.createNew, userController.createNew)
export const UsersRouter = userRoute