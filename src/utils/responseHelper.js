export const successResponse = (res, data, status = 200, message = 'Success') => {
  return res.status(status).json({
    success: true,
    status: status,
    message,
    data,
    errorCode: null
  })
}

export const errorResponse = (res, message = 'Something went wrong', errorCode = 'UNKNOWN_ERROR', status = 400, stack = '') => {
  return res.status(status).json({
    status,
    success: false,
    message,
    data: null,
    errorCode,
    stack
  })
}
