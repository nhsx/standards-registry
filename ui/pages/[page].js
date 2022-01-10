import { Page, MarkdownRender } from '../components';

import { getPages } from '../helpers/api';

const StaticPage = ({ pageData }) => {
  const { content, title } = pageData;
  return (
    <Page title={title}>
      <h1>{title}</h1>
      <MarkdownRender md={content} />
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { page } = context.params;
  const pages = await getPages();
  const pageData = pages.filter((i) => i.name === page).pop();

  return {
    props: {
      pageData,
    },
  };
}

export default StaticPage;
