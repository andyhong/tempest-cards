import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
