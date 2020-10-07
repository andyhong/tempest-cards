import { getSession } from 'next-auth/client'
import fetch from 'isomorphic-unfetch'
import nextConnect from 'next-connect'
import middleware from '../../../middleware/database'
import { ObjectId } from 'mongodb'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    const account = await req.db.collection("accounts").findOne({
      userId: ObjectId(session.user.id)
    })
    const accessToken = account.accessToken
    const response = await fetch(`https://discord.com/api/users/@me/guilds`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${account.accessToken}`
      }
    })
    const guilds = await response.json()
    const isMember = guilds.filter(guild => guild.id == "463050987138056223")
    isMember.length > 0 ? res.send(true) : res.send(false)
  }
  else {
    res.send(false)
  }
})

export default handler
