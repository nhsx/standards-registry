import {
  Layout,
  Reading,
  Snippet,
  Search,
  Page,
  Row,
  Col,
  Filters,
  Dataset,
  FeedbackFooter,
} from '../../components';
import { getPageProps } from '../../helpers/getPageProps';
import { useContentContext } from '../../context/content';
import { useQueryContext } from '../../context/query';
export default function Standards({ data, schemaData }) {
  const { query } = useQueryContext();
  const { setPageTitle } = useContentContext();
  const pageTitle = query.q
    ? `${query.q} - Search Results`
    : 'Current standards';
  return (
    <Page title={setPageTitle(pageTitle)}>
      <h1>{pageTitle}</h1>
      <Reading>
        <Snippet>intro</Snippet>
        <p>
          Explore published standards and APIs used to format and exchange
          healthcare data in England.
        </p>
      </Reading>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-three-quarters">
          <Search
            labelText="Search"
            placeholder="For example, FHIR, allergies, GP"
            location="browse"
          />
        </div>
      </div>
      <Row>
        <Col>
          <Filters schema={schemaData} />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} pagination={true} schema={schemaData} />
        </Col>
      </Row>
      <FeedbackFooter />
    </Page>
  );
}

Standards.Layout = function StandardsLayout({ children }) {
  return <Layout hideBannerSearch>{children}</Layout>;
};

export async function getServerSideProps(context) {
  return await getPageProps(context);
}
