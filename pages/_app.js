import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Header from "../components/Header"
import '../styles/globals.css'
import '../styles/blogPost.css'
import '../styles/prism-theme.css'
import '@fontsource/pathway-gothic-one/400.css'

//focus outline - accessibility
const focusShadow = '0 0 0 2px rgba(125,125,125,.75)'

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
          _focus: {
            boxShadow: focusShadow
          }
      }
    },
    Link: {
      baseStyle: {
          _focus: {
            boxShadow: focusShadow
          }
      }
    }
  },
})

function MyApp({ Component, pageProps }) {

  return (
  <ChakraProvider theme={theme}>
    <Header />
    <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp