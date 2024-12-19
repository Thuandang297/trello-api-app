import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const validateBeforeUpdate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    let validData = await validateBeforeCreate(data)
    const createdData = {
      ...validData,
      boardId: new ObjectId(validData?.boardId),
      columnId: new ObjectId(validData?.columnId)
    }
    if (!createdData) return
    return await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(createdData)
  } catch (error) {
    throw new Error(error)
  }
}

const updateData = async (data) => {
  try {
    const validData = await validateBeforeUpdate(data)
    const updatedData = {
      ...validData,
      boardId: new ObjectId(validData?.boardId),
      columnId: new ObjectId(validData?.columnId)
    }
    if (!updatedData) return
    return await GET_DB().collection(CARD_COLLECTION_NAME).updateOne(updatedData)
  } catch (error) {
    throw new Error(error)
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  updateData
}
