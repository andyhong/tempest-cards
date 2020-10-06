import nextConnect from 'next-connect'
import middleware from '../../middleware/middleware'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  await req.db.collection("cards").find().toArray((err, cards) => {
    if (err) throw err
    res.json(cards)
  })
})

export default handler
