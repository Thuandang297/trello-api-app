import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { TYPE_BOARDS } from '~/utils/constants'

const createNew =async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type:Joi.string().valid(TYPE_BOARDS.PRIVATE,TYPE_BOARDS.PUBLIC).required()
  })
  try {
    await correctCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const updateData = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string().required().trim().messages({
    }),
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(TYPE_BOARDS.PRIVATE, TYPE_BOARDS.PUBLIC).required()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew,
  updateData
}