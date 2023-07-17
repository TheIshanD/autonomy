import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import '@fontsource-variable/raleway';
import '@fontsource-variable/inter';
import '@fontsource-variable/nunito';
import '@fontsource-variable/manrope';
import '@fontsource-variable/urbanist';



const theme = extendTheme({
  colors: {
    brand: {
      100: "#FFF9DE",
      200: "#FFD3B0",
      300: "#FF6969",
      400: "#A6D0DD", 
    },
  },

  fonts: {
    heading: `'Urbanist Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    )
}
