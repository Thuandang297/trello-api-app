/* eslint-disable no-console */

import express from 'express'
import exitHook from 'exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
const START_SERVER = () => {
  const app = express()
  const hostname = env.APP_HOST
  const port = env.APP_PORT
  console.log('3.Start server...')
  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')

  })
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
