import { AppContextProvider } from '@/context/app-context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <AppContextProvider>
      <Component {...pageProps} />
  </AppContextProvider>
}
