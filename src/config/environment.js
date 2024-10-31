import 'dotenv/config'

export const env = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  AUTHOR: process.env.AUTHOR,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME
}
