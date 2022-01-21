import { Page, MarkdownRender } from '../components';

import { getPages } from '../helpers/api';

const StaticPage = ({ pageData }) => {
  const { content, title } = pageData;
  return (
    <Page title={title}>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-three-quarters">
          <h1>{title}</h1>
          <MarkdownRender md={content} />
        </div>
      </div>
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
