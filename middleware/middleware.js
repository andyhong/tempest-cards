import nextConnect from 'next-connect'
import database from './database.js'

const middleware = nextConnect()

middleware.use(database)

export default middleware
