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
    const response = await fetch(`https://discord.com/api/users/@me/guilds`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${account.accessToken}`
      }
    })
    const guilds = await response.json()
    const isMember = guilds.filter(guild => guild.id == "653778768439279676")
    isMember.length > 0
      ? res.json({
        isMember: true
      })
      : res.json({
        isMember: false
      })
  }
  else {
    res.json({
      isMember: false
    })
  }
})

export default handler
