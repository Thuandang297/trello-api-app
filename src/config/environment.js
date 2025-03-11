import 'dotenv/config'
export const env = {
  APP_HOST_LOCAL: process.env.APP_HOST_LOCAL,
  APP_PORT_LOCAL: process.env.APP_PORT_LOCAL,
  APP_HOST_PRODUCT: process.env.HOST,
  APP_PORT_PRODUCT: process.env.PORT,
  AUTHOR: process.env.AUTHOR,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  BUILD_MODE:process.env.BUILD_MODE,
  DOMAIN_DEV: process.env.DOMAIN_DEV,
  DOMAIN_PROD: process.env.DOMAIN_PROD,
  BRAVO_API_KEY: process.env.BRAVO_API_KEY,
  ADMIN_EMAIL_ADDRESS: process.env.ADMIN_EMAIL_ADDRESS,
  ADMIN_EMAIL_NAME: process.env.ADMIN_EMAIL_NAME

}
