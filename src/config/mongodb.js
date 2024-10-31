import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
let trelloDatabaseInstance =''

//Create mongoClientInstance to connect to mogodb
const mongoClientInstance = new MongoClient(env.MONGO_DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB= async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//Get_db get trelloDatabaseInstance
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to db first')
  return trelloDatabaseInstance
}

//Closing DB
export const CLOSE_DB = async () => {
  console.log('4.Closing db...')
  await mongoClientInstance.close()
  console.log('5.Closing db completed...')
}