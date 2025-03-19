import { StatusCodes } from 'http-status-codes'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'
const isAuthorized = async (req, res, next) => {
  const clientAccessToken = req.cookies?.accessToken
  //Nếu accessToken không tồn tại thì trả lỗi
  if (!clientAccessToken) {
    next(ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! Token not found'))
    return
  }
  try {
    //B1.Thực hiện giải mã xem token có hợp lệ không
    const accessTokenDecoded = await JwtProvider.verifiedToken(clientAccessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE)

    //B2.Lưu thông tin được giải mã vào req.jwtDecoder để xử lý
    req.jwtDecoder = accessTokenDecoded

    //B3.Cho request đi tiếp
    next()

  } catch (error) {
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Access token is empried!'))
      return
    }
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized'))
    return
    //Nếu asscess hết hạn thì trả về mã lỗi cho Fe để gọi refresh
  }
}

const authMiddleware = { isAuthorized }

export default authMiddleware