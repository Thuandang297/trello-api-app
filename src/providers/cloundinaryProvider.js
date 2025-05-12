import cloudinary from 'cloudinary'
import streamifier from 'streamifier'

import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'

// Cấu hình Cloudinary với thông tin từ biến môi trường
cloudinary.v2.config({
  cloud_name: env.CLOUNDINARY_CLOUD_NAME,
  api_key: env.CLOUNDINARY_API_KEY,
  api_secret: env.CLOUNDINARY_API_SECRET,
  secure: true, // vẫn dùng HTTPS
  strict: false // thêm nếu cần
})

/**
 * Upload file lên Cloudinary bằng stream
 * fileBuffer - Buffer của file cần upload
 *  options - Tùy chọn upload (ví dụ: thư mục, định dạng, v.v.)
 *  - URL của file đã upload
 */
export const uploadToCloudinary = async (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload(options, (error, result) => {
      if (error) {
        return reject(new ApiError('Failed to upload file to Cloudinary'))
      }
      resolve(result.secure_url) // Trả về URL an toàn của file đã upload
    })

    // Sử dụng streamifier để chuyển buffer thành stream và pipe vào Cloudinary
    streamifier.createReadStream(file.buffer).pipe(uploadStream)
  })
}