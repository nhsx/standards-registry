import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { useContentContext } from '../../context/content';

export default function Page({ children, title }) {
  const context = useContentContext();
  return (
    <>
      <Head>
        <title>{title || context.title}</title>
      </Head>
      <NextNProgress />
      {children}
    </>
  );
}
