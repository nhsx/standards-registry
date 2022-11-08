import { parse } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { getPages } from '../helpers/api';
import { Page, TableOfContents, CookiesTable } from '../components';
import { getHost } from '../helpers/getHost';

const StaticPage = ({
  content,
  showToc,
  title,
  parsed,
  description,
  page,
  host,
}) => {
  return (
    <Page title={title} description={description} host={host}>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-third">
          <br />
        </div>
        <div className="nhsuk-grid-column-two-thirds">
          <h1>{title}</h1>
        </div>
        {showToc && (
          <div className="nhsuk-grid-column-one-third">
            <TableOfContents content={parsed} />
          </div>
        )}
        <div className="nhsuk-grid-column-two-thirds">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {page === 'cookie-policy' && <CookiesTable />}
        </div>
      </div>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
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
      host: await getHost(req),
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
