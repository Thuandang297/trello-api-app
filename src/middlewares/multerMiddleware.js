
//Filter validate file

import multer from 'multer'

// Liên quan đến Validate File
const VALIDATE_MAX_SIZE = 2 * 1024 * 1024 //2MB
const VALIDATE_FILE_TYPE_MESSAGE = 'File type incorrect! Please upload true file type (jpeg, jpg, png)!'
const VALIDATE_MAX_SIZE_MESSAGE = 'Please upload file < 2MB!'
const VALIDATE_FILE_PROPERTY_MESSAGE = 'File can not have bank values!'
const UPLOAD_FILE_SUCCESS_MESSAGE = 'File upload success!'
const UPLOAD_FILE_FAIL_MESSAGE = 'File upload fail!'
const VALIDATE_FILE_TYPE = ['image/jpg', 'image/jpeg', 'image/png']
const singleFileValidator = (file) => {
  console.log('🚀 ~ singleFileValidator ~ file:', file)
  if (!file || !file.name || !file.size || !file.mimetype) {
    return VALIDATE_FILE_PROPERTY_MESSAGE
  }
  if (file.size > VALIDATE_MAX_SIZE) {
    return VALIDATE_MAX_SIZE_MESSAGE
  }
  if (!VALIDATE_FILE_TYPE.includes(file.type)) {
    return VALIDATE_FILE_TYPE_MESSAGE
  }
  return null
}

const customeFileFilter = (req, file, callback) => {
  console.log('🚀 ~ customeFileFilter ~ file:', file)
  const validateFileMessage = singleFileValidator(file)
  if (validateFileMessage) return callback(validateFileMessage, null)

  callback(null, true)
}
const upload = multer({
  limit: { fileSize: VALIDATE_MAX_SIZE },
  fileFilter: customeFileFilter
})

export const multerUploadMiddleware = { upload }