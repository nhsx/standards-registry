import Head from 'next/head';
import { useContentContext } from '../../context/content';
import { WebPageSchema } from '../DatasetSchema';
import { useQueryContext } from '../../context/query';

const getQueryForTitle = (query) => {
  const joiner = ' - ';
  const vals = Object.values(query);
  if (vals.length === 0) {
    return '';
  }
  const queryShift = typeof vals.length > 1 ? vals.shift()[0] : vals.shift();
  const queryTitle = Array.isArray(queryShift) ? queryShift[0] : queryShift;
  return [joiner, queryTitle].join('');
};

export default function Page({ children, host, description, title }) {
  const { query } = useQueryContext();
  const { setPageTitle } = useContentContext();
  const pageTitle = `${setPageTitle(title)}${getQueryForTitle(query)}`;
  return (
    <>
      <WebPageSchema title={title} description={description} host={host} />
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      {children}
    </>
  );
}
