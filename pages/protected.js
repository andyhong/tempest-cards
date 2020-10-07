import { signIn, signOut, useSession } from 'next-auth/client'

const Test = ({ isMember }) => {
  const [ session, loading ] = useSession()

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

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/api/auth/ihof`)
  const isMember = await response.json()
  return {
    props: {
      isMember
    }
  }
}

export default Test
