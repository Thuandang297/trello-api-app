import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { columnModel } from './columnModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),
  cover: Joi.string(),
  memberIds: Joi.array().items(Joi.string()).default([]),
  comments: Joi.array().items(Joi.string()).default([]),
  attachments: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const ALLOW_FIELD_UPDATED = ['boardId', 'columnId', 'title', 'cardOrderIds', 'cards']

const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const validateBeforeUpdate = (body) => {
  const bodyKeys = Object.keys(body)
  return bodyKeys.every(key => ALLOW_FIELD_UPDATED.includes(key))
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
    const createdCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(createdData)

    // Insert into Column.cardOrderIds
    columnModel.pushInCardOrderIds(validData?.columnId, createdCard.insertedId)

    //Return value of created card
    return await GET_DB().collection(CARD_COLLECTION_NAME).findOne({ _id: createdCard.insertedId })
  } catch (error) {
    throw new Error(error)
  }
}

const updateData = async (cardId, data) => {
  try {
    const validData = validateBeforeUpdate(data)
    if (!validData) {throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid data have key not allow to update')}
    const updatedData = {
      ...data,
      updatedAt: Date.now()
    }
    data?.boardId ? updatedData.boardId = new ObjectId(data?.boardId) : delete updatedData['boardId']
    data?.columnId ? updatedData.columnId = new ObjectId(data?.columnId) : delete updatedData['columnId']
    return await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate({
      _id: new ObjectId(cardId)
    },
    {
      $set: updatedData
    },
    { returnDocument: 'after', upsert: true })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteManyCardByColumnId = async (columnId) => {
  try {
    const deleteData = {
      _destroy:true,
      updatedAt: Date.now()
    }
    return await GET_DB().collection(CARD_COLLECTION_NAME).updateMany({
      columnId: new ObjectId(columnId)
    },
    {
      $set: deleteData
    },
    { returnDocument: 'after', upsert: true })
  } catch (error) {
    throw new Error(error)
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  updateData,
  deleteManyCardByColumnId
}
