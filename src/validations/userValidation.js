import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'

var correctConditionCreate = Joi.object({
  email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
  password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE)
})

var correctConditionUpdate = Joi.object({
  displayName: Joi.string()
})

var correctConditionVerify = Joi.object({
  email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
  token: Joi.string().required()
})

const createNew = async (req, res, next) => {
  try {
    await correctConditionCreate.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  try {
    await correctConditionUpdate.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const verify = async (req, res, next) => {
  try {
    await correctConditionVerify.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const login = async (req, res, next) => {
  try {
    await correctConditionCreate.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const userValidation = {
  createNew,
  update,
  verify,
  login
}