import express from 'express'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'
import authMiddleware from '~/middlewares/authMiddleware'
import { multerUploadMiddleware } from '~/middlewares/multerMiddleware'
const userRoute = express.Router()
userRoute.route('/register').post(userValidation.createNew, userController.createNew)

userRoute.route('/verify').put(userValidation.verify, userController.verify)

userRoute.route('/login').put(userValidation.login, userController.login)

userRoute.route('/:id').get(userController.getUserDetail)

userRoute.route('/logout').delete(userController.logout)

userRoute.route('/refresh-token').post(userController.refreshToken)

userRoute.route('/update').put(authMiddleware.isAuthorized, userValidation.update, userController.updateUser)

export const UsersRouter = userRoute