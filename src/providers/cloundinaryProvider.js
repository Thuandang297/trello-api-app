import { v2 as cloudinaryV2 } from 'cloudinary'
import streamifier from 'streamifier'

import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'

// Cấu hình Cloudinary với thông tin từ biến môi trường
cloudinaryV2.config({
  cloud_name: env.CLOUNDINARY_CLOUD_NAME,
  api_key: env.CLOUNDINARY_API_KEY,
  api_secret: env.CLOUNDINARY_API_SECRET
})

/**
 * Upload file lên Cloudinary bằng stream
 * fileBuffer - Buffer của file cần upload
 *  options - Tùy chọn upload (ví dụ: thư mục, định dạng, v.v.)
 *  - URL của file đã upload
 */
const uploadToCloudinary = async (fileBuffer, folderName) => {
  // Kiểm tra đầu vào
  if (!fileBuffer) {
    throw new ApiError('File buffer is required for upload')
  }
  if (!folderName) {
    throw new ApiError('Folder name is required for upload')
  }

  try {
    const options = { folder: folderName }
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinaryV2.uploader.upload_stream(options, (error, result) => {
        if (result) {
          resolve(result.secure_url) // Trả về URL an toàn của file đã upload
        }
        else if (error) {
          return reject(new ApiError(`Failed to upload file to Cloudinary: ${error.message}`))
        }
      })

      // Sử dụng streamifier để chuyển buffer thành stream và pipe vào Cloudinary
      streamifier.createReadStream(fileBuffer).pipe(uploadStream)
    })
  } catch (error) {
    throw new ApiError(`uploadToCloudinary>>Failed to upload file to Cloudinary: ${error.message}`)
  }
}

export const CloundinaryProvider = { uploadToCloudinary }