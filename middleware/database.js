import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export async function initDB(db) {
  db
    .collection('cards')
}

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect()
  req.dbClient = client;
  req.db = client.db("tempest")
  await initDB(req.db)
  return next()
}
