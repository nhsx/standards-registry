import Head from 'next/head';
import { useContentContext } from '../../context/content';

export default function Page({ children, ...props }) {
  const { setPageTitle } = useContentContext();
  const title = setPageTitle(props.title);
  return (
    <>
      <Head>
        <title>{title}</title>
        {props.description && (
          <meta name="description" value={props.description} />
        )}
      </Head>
      {children}
    </>
  );
}
