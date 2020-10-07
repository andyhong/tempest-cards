import { getSession, signIn, signOut, useSession } from 'next-auth/client'

const Test = ({ session, isMember }) => {

  return (
    <div>
      {!session && <>
        Not signed in <br />
        <button onClick={signIn}> Sign in </button>
      </>}
      {session && !isMember && <>
        Signed in as {session.user.email} <br />
        You are not currently a member of IHOF <br />
        <button onClick={signOut}> Sign out</button>
      </>}
      {session && isMember && <>
        Signed in as {session.user.email} <br />
        Protected content <br />
        <button onClick={signOut}> Sign out</button>
      </>}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let isMember = null

  if (session) {
    const options = { headers: { cookie: context.req.headers.cookie } }
    const response = await fetch(`${process.env.API_URL}/api/auth/ihof`, options)
    const json = await response.json()
    isMember = json
  }

  return {
    props: {
      session,
      isMember
    }
  }
}

export default Test
