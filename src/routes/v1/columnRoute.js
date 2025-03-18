import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'
import  authMiddleware   from '~/middlewares/authMiddleware'

const columnRouter = express.Router()

columnRouter.route('/')
  .post(authMiddleware.isAuthorized, columnValidation.createNew, columnController.createNew)
columnRouter.route('/:id').put(authMiddleware.isAuthorized, columnValidation.updateData, columnController.updateData)

columnRouter.route('/:id').delete(authMiddleware.isAuthorized, columnValidation.deleteData, columnController.deleteData)
export const ColumnsRouter = columnRouter