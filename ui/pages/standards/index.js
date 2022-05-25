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

export default function Standards({ data, schemaData }) {
  return (
    <Page>
      <h1>Published standards</h1>
      <Reading>
        <Snippet>intro</Snippet>
        <p>
          Explore all published data standards and information codes of practice
          in England or view future standards.
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
