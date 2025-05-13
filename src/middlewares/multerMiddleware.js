import multer from 'multer'

// Multer là middleware dùng để xử lý multipart/form-data, thường dùng để upload file
// Multer sẽ tự động parse multipart/form-data và lưu file vào req.file hoặc req.files
// Constants cho validate
const VALIDATE_MAX_SIZE = 2 * 1024 * 1024 // 2MB
const VALIDATE_FILE_TYPE_MESSAGE = 'File type incorrect! Please upload image (jpeg, jpg, png)!'
const VALIDATE_MAX_SIZE_MESSAGE = 'Please upload file smaller than 2MB!'
const VALIDATE_FILE_PROPERTY_MESSAGE = 'File cannot have empty values!'
const VALIDATE_FILE_TYPE = ['image/jpeg', 'image/jpg', 'image/png']

// Validate 1 file
const singleFileValidator = (file) => {
  if (!file || !file.originalname || !file.mimetype) {
    return VALIDATE_FILE_PROPERTY_MESSAGE
  }
  if (!VALIDATE_FILE_TYPE.includes(file.mimetype)) {
    return VALIDATE_FILE_TYPE_MESSAGE
  }
  return null
}

// Custom fileFilter cho multer
const customFileFilter = (req, file, callback) => {
  const validateFileMessage = singleFileValidator(file)
  if (validateFileMessage) {
    return callback(new Error(validateFileMessage), false)
  }
  callback(null, true)
}

// Dùng memoryStorage nếu không lưu xuống ổ đĩa
// const storage = multer.memoryStorage()

const upload = multer({
  // storage,
  limits: { fileSize: VALIDATE_MAX_SIZE },
  fileFilter: customFileFilter
})

// Xuất middleware dùng được trực tiếp trong route
export const multerUploadMiddleware = {
  single: upload.single('file'),
  array: (fieldName, maxCount = 5) => upload.array(fieldName, maxCount),
  fields: (fieldsConfig) => upload.fields(fieldsConfig),
  none: upload.none()
}
