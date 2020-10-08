import { getSession } from 'next-auth/client'
import fetch from 'isomorphic-unfetch'
import nextConnect from 'next-connect'
import middleware from '../../../middleware/database'
import { ObjectId } from 'mongodb'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  const session = await getSession({ req })
  let discordUser = {}

  if (session) {
    const account = await req.db.collection("accounts").findOne({
      userId: ObjectId(session.user.id)
    })
    const options = { headers: { 'Authorization': `Bearer ${account.accessToken}` } }
    const userResponse = await fetch(`https://discord.com/api/users/@me`, options)
    const userJson = await userResponse.json()
    discordUser = userJson
    const guildsResponse = await fetch(`https://discord.com/api/users/@me/guilds`, options)
    const guildsJson = await guildsResponse.json()
    const isMember = guildsJson.filter(guild => guild.id == "463050987138056223")
    discordUser = isMember.length > 0
      ? {...discordUser, ihofMember: true}
      : {...discordUser, ihofMember: false}
  }
  res.json(discordUser)
})

export default handler
