import JWT from 'jsonwebtoken'

const generateToken = async (userInfo, sercretSignature, tokenLife) => {
  try {
    return JWT.sign(userInfo, sercretSignature, { algorithm:'HS256', expiresIn:tokenLife })
  } catch (error) {
    throw new Error(error)
  }
}

const verifiedToken = async (token, sercretSignature) => {
  try {
    return JWT.verify(token, sercretSignature)
  } catch (error) {
    throw new Error(error)
  }
}

export const JwtProvider = { generateToken, verifiedToken }