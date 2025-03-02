/* eslint-disable no-console */

import express from 'express'
import exitHook from 'exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_v1 } from './routes/v1'
import { errorHandlingMiddleWare } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './cors'
import cors from 'cors'
import { swaggerDocs } from './config/swagger'
const START_SERVER = () => {
  const app = express()
  const hostLocal = env.APP_HOST_LOCAL
  const portLocal = env.APP_PORT_LOCAL
  const hostProduct = env.APP_HOST_PRODUCT
  const portProduct = env.APP_PORT_PRODUCT


  console.log('3.Start server...')
  //to use bodyRequest type json
  app.use(express.json())


  app.use(cors(corsOptions))

  swaggerDocs(app)

  app.use('/v1', APIs_v1)

  app.use(errorHandlingMiddleWare)
  //Using for handle error
  //Check environment
  if (env.BUILD_MODE === 'production') {
    console.log(`4.Server is running in production mode at host: ${hostProduct} port: ${portProduct}`)
    app.listen(portProduct, () => {
    })
  } else {
    console.log(`4.Server is running in development mode in ${hostLocal}:${portLocal}`)
    app.listen(portLocal, hostLocal, () => {
    })
  }

  exitHook(() => {
    console.log('Server is shutting down!')
    CLOSE_DB()
  })
}

(async () => {
  try {
    console.log('1.Connecting to mongodb...')
    await CONNECT_DB()
    console.log('2.Connecting to mongodb success!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
