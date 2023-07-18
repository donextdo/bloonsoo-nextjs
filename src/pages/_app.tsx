import Layout from '@/components/Layout/Layout';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { store } from '../../stores/store'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const router = useRouter ()
  // make function that will return the children based on router.pathname
  const getContent = () => {
    // array of all the paths that don't need layout
    if (['/signin', '/register'].includes(router.pathname))
      return <Component {...pageProps} />;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <div>
      <Provider store={store}>
        {getContent()}
      </Provider>
    </div>
  );
}
