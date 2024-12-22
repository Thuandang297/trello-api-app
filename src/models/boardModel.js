import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { TYPE_BOARDS } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

const BOARD_COLLECTION_NAME ='board'
const BOARD_COLLECTION_SCHEMA =Joi.object({
  _id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt:Joi.date().timestamp('javascript').default(Date.now),
  updatedAt:Joi.date().timestamp('javascript').default(null),
  _destroy:Joi.boolean().default(false),
  type: Joi.string().valid(TYPE_BOARDS.PRIVATE, TYPE_BOARDS.PUBLIC).required(),
  ownerIds: Joi.array().items(Joi.string()).default([]),
  memberIds: Joi.array().items(Joi.string()).default([])
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}


const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    if (!validData) return
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: createdBoard?.insertedId })
  } catch (error) {
    throw new Error(error)
  }
}

const updateBoard = async (req) => {
  try {
    const validData = await validateBeforeCreate(req)
    if (!validData) return
    const updatedData = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate({
      _id:new ObjectId(req._id)
    },
    { $set:{
      title: req.title,
      slug: req.slug,
      description: req.description,
      updatedAt: Date.now(),
      type: req.type }
    },
    { returnDocument: 'after', upsert: true })
    return updatedData
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
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      {
        $match: {
          _id: new ObjectId(boardId),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: columnModel.COLUMN_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: cardModel.CARD_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      }
    ]).toArray()
    return result[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel ={
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findById,
  getDetails,
  updateBoard
}