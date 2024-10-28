/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'
const START_SERVER = () => {
  const app = express()
  const hostname = 'localhost'
  const port = 8017
  console.log('3.Start server...')
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`This app is running at hostname:${hostname} and port:${port}`)
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
