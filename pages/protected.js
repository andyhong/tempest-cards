import { getSession, signIn, signOut} from 'next-auth/client'

const Test = ({ session, user }) => {

  return (
    <div>
      {!session && <>
        Not signed in <br />
        <button onClick={signIn}> Sign in </button>
      </>}
      {session && !user.ihofMember && <>
        Signed in as <strong>{`${user.username}#${user.discriminator}`}</strong> <br />
        You are not currently a member of IHOF <br />
        <button onClick={signOut}> Sign out</button>
      </>}
      {session && user.ihofMember && <>
        Signed in as <strong>{`${user.username}#${user.discriminator}`}</strong> <br />
        Protected content <br />
        <button onClick={signOut}> Sign out</button>
      </>}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let user = null

  if (session) {
    const options = { headers: { cookie: context.req.headers.cookie } }
    const response = await fetch(`${process.env.API_URL}/api/auth/me`, options)
    const json = await response.json()
    user = json
  }

  return {
    props: {
      session,
      user
    }
  }
}

export default Test
