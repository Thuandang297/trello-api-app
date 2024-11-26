/* eslint-disable no-console */

import express from 'express'
import exitHook from 'exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_v1 } from './routes/v1'
import { errorHandlingMiddleWare } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './cors'
import cors from 'cors'
const START_SERVER = () => {
  const app = express()
  const hostname = env.APP_HOST
  const port = env.APP_PORT
  console.log('3.Start server...')
  //to use bodyRequest type json
  app.use(express.json())
  app.use(cors(corsOptions))

  app.use('/v1', APIs_v1)

  app.use(errorHandlingMiddleWare)
  //Using for handle error

  app.listen(port, hostname, () => {

  })
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
