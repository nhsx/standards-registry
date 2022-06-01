import DOMPurify from 'isomorphic-dompurify';
import { Page, TableOfContents, MarkdownRender } from '../components';
import { getPages } from '../helpers/api';

const StaticPage = ({ content, showToc, title }) => {
  return (
    <Page title={title}>
      <div className="nhsuk-grid-row">
        {showToc && <TableOfContents content={content} />}
        <div className="nhsuk-grid-column-two-thirds">
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

  if (!pageData) {
    return {
      notFound: true,
    };
  }
  const {
    title,
    content: unsanitised,
    show_table_of_contents: showToc,
  } = pageData;
  const content = DOMPurify.sanitize(unsanitised);

  return {
    props: {
      showToc,
      content,
      title,
    },
  };
}

export default StaticPage;
