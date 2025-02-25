import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { TYPE_BOARDS } from '~/utils/constants'
import j2s from 'joi-to-swagger'

var correctConditionCreate = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict().messages({
  }),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(TYPE_BOARDS.PRIVATE, TYPE_BOARDS.PUBLIC).required()
})

const correctConditionUpdate = Joi.object({
  title: Joi.string().min(3).max(50).trim().strict(),
  description: Joi.string().min(3).max(256).trim().strict(),
  type: Joi.string().valid(TYPE_BOARDS.PRIVATE, TYPE_BOARDS.PUBLIC),
  columnOrderIds: Joi.array().items(Joi.string()).default([])
})

const createNew =async (req, res, next) => {
  try {
    await correctConditionCreate.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const updateData = async (req, res, next) => {
  try {
    // allowUnknown :Cho phép không cần đẩy một số field lên
    await correctConditionUpdate.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
// 2️⃣ Chuyển Joi Schema thành OpenAPI Schema (Swagger)
const { swagger: createBoardSwagger } = j2s(correctConditionCreate)
const { swagger: updateBoardSwagger } = j2s(correctConditionUpdate)

export const boardValidation = {
  createNew,
  updateData,
  createBoardSwagger,
  updateBoardSwagger
}