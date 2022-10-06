import { parse } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { getPages } from '../helpers/api';
import { Page, TableOfContents, CookiesTable } from '../components';

const StaticPage = ({ content, showToc, title, parsed, description, page }) => {
  return (
    <Page title={title} description={description}>
      <div className="nhsuk-grid-row">
        {showToc && <TableOfContents content={parsed} />}
        <div className="nhsuk-grid-column-two-thirds">
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {page === 'cookie-policy' && <CookiesTable />}
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
    meta_description: description,
  } = pageData;

  const content = DOMPurify.sanitize(parse(unsanitised));
  const parsed = fromMarkdown(DOMPurify.sanitize(unsanitised));

  return {
    props: {
      pages,
      showToc,
      description,
      content,
      title,
      parsed,
      page,
    },
  };
}

export default StaticPage;
