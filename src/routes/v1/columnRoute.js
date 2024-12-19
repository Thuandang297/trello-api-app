import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'
const columnRouter = express.Router()

columnRouter.route('/')
  .post(columnValidation.createNew, columnController.createNew)
  .put(columnValidation.updateData, columnController.updateData)

export const ColumnsRouter = columnRouter