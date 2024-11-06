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
    //validate xong thì chạy sang controller ở next()
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: new Error(error).message })
  }
}

const updateData = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string().required().trim().messages({
    }),
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ Errors: new Error(error).message })
  }
}

export const boardValidation = {
  createNew,
  updateData
}