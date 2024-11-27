import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { TYPE_BOARDS } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const BOARD_COLLECTION_NAME ='board'
const BOARD_COLLECTION_SCHEMA =Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt:Joi.date().timestamp('javascript').default(Date.now),
  updatedAt:Joi.date().timestamp('javascript').default(null),
  _destroy:Joi.boolean().default(false),
  type: Joi.string().valid(TYPE_BOARDS.PRIVATE, TYPE_BOARDS.PUBLIC).required()
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    if (!validData) return
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findById = async (boardId) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne(
      { _id: new ObjectId(boardId) })
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (boardId) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne(
      { _id: new ObjectId(boardId) })
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel ={
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findById,
  getDetails
}