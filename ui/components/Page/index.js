import Head from 'next/head';
import { useContentContext } from '../../context/content';

export default function Page({ children, title }) {
  const { content } = useContentContext();
  return (
    <>
      <Head>
        <title>{title || content.title}</title>
      </Head>
      {children}
    </>
  );
}
