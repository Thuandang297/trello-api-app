import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'

const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user'
}

//Những trường không muốn cập nhật trong hàm update
const INVALID_FIELD_UPDATED = ['_id', 'email', 'username', 'createAt']

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email().trim().strict().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
  password: Joi.string().required().pattern(PASSWORD_RULE).min(8).max(256).trim().strict().message(PASSWORD_RULE_MESSAGE),

  userName: Joi.string().min(3).max(50).trim().strict(),
  displayName: Joi.string().min(3).max(50).trim().strict(),
  avatar: Joi.string().default(null),
  role: Joi.string().valid(USER_ROLE.ADMIN, USER_ROLE.USER).default(USER_ROLE.USER),

  isActive: Joi.boolean().default(true),
  verifyToken: Joi.string().default(null),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    if (!validData) return
    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: createdUser?.insertedId })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneByEmail = async (email) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email })
  } catch (error) {
    throw new Error(error)

  }
}

const findOneById= async (userId) => {
  try {
    const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(userId) })
    return user
  } catch (error) {
    throw new Error(error)

  }
}

const validateBeforeUpdate = (body) => {
  const bodyKeys = Object.keys(body)
  return !bodyKeys.some(key => INVALID_FIELD_UPDATED.includes(key))
}

const updateData = async (userId, data) => {
  try {
    const validData = validateBeforeUpdate(data)
    if (!validData) return
    const updatedData = {
      ...data,
      updatedAt: Date.now()
    }
    return await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate({
      _id: new ObjectId(userId)
    },
    {
      $set: updatedData
    },
    { returnDocument: 'after', upsert: true })
  } catch (error) {
    throw new Error(error)
  }
}
export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  updateData,
  findOneByEmail,
  findOneById
}