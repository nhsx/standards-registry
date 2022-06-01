import DOMPurify from 'isomorphic-dompurify';
import { Page, TableOfContents } from '../components';
import { getPages } from '../helpers/api';
import { parse } from 'marked';
import { fromMarkdown } from 'mdast-util-from-markdown';

const StaticPage = ({ content, showToc, title, parsed }) => {
  return (
    <Page title={title}>
      <div className="nhsuk-grid-row">
        {showToc && <TableOfContents content={parsed} />}
        <div className="nhsuk-grid-column-two-thirds">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
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

  const content = DOMPurify.sanitize(parse(unsanitised));
  const parsed = fromMarkdown(DOMPurify.sanitize(unsanitised));

  return {
    props: {
      showToc,
      content,
      title,
      parsed,
    },
  };
}

export default StaticPage;
