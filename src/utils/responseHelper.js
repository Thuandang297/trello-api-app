export const successResponse = (res, data, status = 200, message = 'Success') => {
  return res.status(status).json({
    success: true,
    status: status,
    message,
    data,
    errorCode: null
  })
}

export const errorResponse = (res, message = 'Something went wrong', errorCode = 'UNKNOWN_ERROR', status = 400) => {
  return res.status(status).json({
    success: false,
    message,
    data: null,
    errorCode
  })
}
