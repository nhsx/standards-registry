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

const staticPageProps = {
  title: 'Current standards',
  description:
    'Find published data standards for health and social care including standards required for use in England.',
};

export default function Standards({ data, schemaData, host }) {
  const pageProps = { ...staticPageProps, host };
  return (
    <Page {...pageProps}>
      <h1>
        {pageProps.title}
        <span className="nhsuk-u-visually-hidden">
          Search or browse published standards
        </span>
      </h1>
      <Reading>
        <Snippet>intro</Snippet>
        <p>
          Use this directory to find nationally recognised data standards for
          use in health and adult social care.
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
