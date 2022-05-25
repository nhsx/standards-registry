import '../styles/globals.scss';
import { PageContext } from '../context';
import { Layout as DefaultLayout } from '../components';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <PageContext {...pageProps}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </PageContext>
  );
}

export default MyApp;
