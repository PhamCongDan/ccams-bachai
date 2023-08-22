
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import Loading from '@/components/common/Loading'
import '@/styles/globals.scss'
import store from 'store'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { app: { isLoading } } = store.getState();
  
  return (
    <Provider store={store}>
      <Header />
      <div className="flex min-h-screen bg-[#FAFAFA]">
        <Sidebar />
        <div className='w-full'>
          <Component {...pageProps} />
        </div>
      </div>
      {isLoading && <Loading />}
    </Provider>
  )
}
