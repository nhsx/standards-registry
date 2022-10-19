import Head from 'next/head';
import { useContentContext } from '../../context/content';
import { WebPageSchema } from '../DatasetSchema';

export default function Page({ children, host, description, title }) {
  const { setPageTitle } = useContentContext();
  const pageTitle = setPageTitle(title);
  return (
    <>
      <WebPageSchema title={title} description={description} host={host} />
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" value={description} />}
      </Head>
      {children}
    </>
  );
}
