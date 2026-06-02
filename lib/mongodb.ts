import { MongoClient, Db } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Missing environment variable: MONGODB_URI - check your .env file')
  }

  const client = new MongoClient(uri, {
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 5000,
  })

  await client.connect()
  const db = client.db('autolink')

  cachedClient = client
  cachedDb = db

  return { client, db }
}
