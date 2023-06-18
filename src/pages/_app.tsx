import Layout from '@/components/Layout/Layout';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { store } from '../../stores/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </Provider>
    </div>
  );}
