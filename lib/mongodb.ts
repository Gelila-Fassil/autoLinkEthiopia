import { MongoClient, Db } from 'mongodb'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | null
  // eslint-disable-next-line no-var
  var _mongoDb: Db | null
}

let cachedClient: MongoClient | null = global._mongoClient || null
let cachedDb: Db | null = global._mongoDb || null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Missing environment variable: MONGODB_URI - check your .env file')
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
    w: 'majority',
  })

  await client.connect()
  const db = client.db('autolink')

  cachedClient = client
  cachedDb = db

  if (process.env.NODE_ENV !== 'production') {
    global._mongoClient = client
    global._mongoDb = db
  }

  return { client, db }
}
