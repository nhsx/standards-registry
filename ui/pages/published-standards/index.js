import { useEffect } from 'react';
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
} from '../../components';
import { getPageProps } from '../../helpers/getPageProps';
import { useQueryContext } from '../../context/query';

const staticPageProps = {
  title: 'Published standards',
  description:
    'Find published data standards for health and social care including standards required for use in England.',
};

export default function Standards({ data, schemaData, host }) {
  const { getSelections, updateQuery } = useQueryContext();

  useEffect(() => {
    const currentSelections = getSelections();
    const order = currentSelections.order || 'asc';
    const orderBy = currentSelections.orderBy || 'name';
    const selections = { ...currentSelections, order, orderBy };
    updateQuery(selections, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Discover recognised published standards that help things work together
          for service users in health and adult social care within England.
        </p>
      </Reading>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-three-quarters">
          <Search
            labelText="Search"
            placeholder="Search published standards"
            location="browse"
          />
        </div>
      </div>
      <Row>
        <Col>
          <Filters schema={schemaData} showRequirementFilter={true} />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} pagination={true} schema={schemaData} />
        </Col>
      </Row>
    </Page>
  );
}

Standards.Layout = function StandardsLayout({ children }) {
  return <Layout hideBannerSearch>{children}</Layout>;
};

export async function getServerSideProps(context) {
  return await getPageProps(context);
}
