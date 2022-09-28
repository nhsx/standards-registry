import { parse } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { getPages } from '../helpers/api';
import { Page, TableOfContents, CookiesTable } from '../components';

// TODO: pull these from CKAN
const descriptions = {
  'about-standards':
    'Find out about the different types and benefits of data standards in health and social care and how to report a gap in standards.',
  'help-and-resources':
    'Explore resources for the data standards community in health and social care including links to discussion forums and government regulations.',
  'accessibility-statement':
    'Check how accessible our website is for disabled people and others.',
  'cookie-policy':
    'Check how we use cookies to collect and store information about visits to our website.',
  'privacy-policy':
    'Check how we collect, use, share and store data for people visiting our website.',
  'about-this-service':
    'Check who owns and manages the NHS Data Standards Directory and what the service is for.',
};

const StaticPage = ({ content, showToc, title, parsed, page }) => {
  return (
    <Page title={title} description={descriptions[page]}>
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
  } = pageData;

  const content = DOMPurify.sanitize(parse(unsanitised));
  const parsed = fromMarkdown(DOMPurify.sanitize(unsanitised));

  return {
    props: {
      pages,
      showToc,
      content,
      title,
      parsed,
      page,
    },
  };
}

export default StaticPage;
