import { slugify } from '~/utils/formatter'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newResponse={
      ...reqBody,
      slug: slugify(reqBody?.title)
    }
    return newResponse
  } catch (error) {
    throw error
  }
}

export const boardService ={
  createNew
}