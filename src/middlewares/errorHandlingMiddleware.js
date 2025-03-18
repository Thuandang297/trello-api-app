import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const errorHandlingMiddleWare = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  const responseErrors = {
    statusCode: err.statusCode,
    message: err.message || err[StatusCodes.INTERNAL_SERVER_ERROR],
    stack: err.stack //Help to trace bug with the information when log it out
  }
  if (env.BUILD_MODE !='development') delete responseErrors.stack
  next()
  return res?.status(responseErrors.statusCode).json({ ...responseErrors })
}