import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../store'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <div className="flex h-screen bg-[#FAFAFA]">
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
