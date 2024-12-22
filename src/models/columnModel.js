import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { boardModel } from './boardModel'
// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'

const COLUMN_COLLECTION_SCHEMA = Joi.object({
  // boardId:Joi.required(),
  boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn
  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const validateBeforeUpdate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdData = {
      ...validData,
      boardId: new ObjectId(validData?.boardId)
    }
    if (!createdData) return
    const createdColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(createdData)

    //Add createdColumnId in Board.columnOrderIds
    await boardModel.pushInColumnOrderIds(validData?.boardId, createdColumn.insertedId)
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({ _id: createdColumn.insertedId })
  } catch (error) {
    throw new Error(error)
  }
}

const updateData = async (data) => {
  try {
    const validData = await validateBeforeUpdate(data)
    const updatedData = {
      ...validData,
      boardId: new ObjectId(validData?.boardId)
    }
    if (!updatedData) return
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).updateOne(updatedData)
  } catch (error) {
    throw new Error(error)
  }
}

const pushInCardOrderIds = async (columnId, cardId) => {
  try {
    const updatedColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate({
      _id: new ObjectId(columnId)
    }, {
      $push:{
        cardOrderIds: cardId
      }
    }, { returnDocument: 'after' })
    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  updateData,
  pushInCardOrderIds
}