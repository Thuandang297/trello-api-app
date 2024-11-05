import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const createNew =async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body)
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'Note, api created' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: new Error(error).message })
  }
}

const updateData = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string().required().trim().messages({
      'string.base': 'should be a type of ',
      'string.empty': 'cannot be an empty field',
      'string.min': 'should have a minimum length of {#limit}',
      'any.required': 'is a required field'
    }),
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    return res.status(StatusCodes.CREATED).json({ message: 'Update completed' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ Errors: new Error(error).message })
  }
}

export const boardValidation = {
  createNew,
  updateData
}