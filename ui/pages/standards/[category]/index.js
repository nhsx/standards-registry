import { Reading, Snippet, Page, Row, Col, Filters, Dataset } from '../../../components';
import { list } from '../../../helpers/api';

const CONTENT = {
  content: {
    title: 'Browse content standards',
    intro: 'Find clinical codes, content and data formats to collect and share information in health and social care settings in England.',
    filters: {
      all: 'Showing {{num}} content standard{{#plural}}s{{/plural}}'
    }
  },
  technical: {
    title: 'Browse technical standards',
    intro: 'Find technical specifications and APIs to build technology products for health and social care settings in England.',
    filters: {
      all: 'Showing {{num}} technical standard{{#plural}}s{{/plural}}'
    }
  },
  services: {
    title: 'Browse services',
    intro: 'Find central datasets to connect to and make use of national resources like NHS Email and Wifi.',
    filters: {
      all: 'Showing {{num}} service{{#plural}}s{{/plural}}'
    }
  }
}

export default function Category({ data }) {
  return (
    <Page>
      <h1><Snippet inline>title</Snippet></h1>
      <Reading>
        <Snippet>intro</Snippet>
      </Reading>
      <Row>
        <Col>
          <Filters />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} pagination={true} />
        </Col>
      </Row>
    </Page>
  )
}

export async function getServerSideProps(context) {
  const { page } = context.query;
  const { category } = context.params;
  const data = await list({ page });

  return {
    props: {
      data,
      content: CONTENT[category]
    }
  }

}
