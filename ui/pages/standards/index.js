import Link from 'next/link';
import { Reading, Page, Snippet, Row, Col } from '../../components';

const CONTENT = {
  title: 'Browse directory',
  intro: 'Find standards, services and rules for building interoperable technology in health and social care in England.',
  content: {
    link: 'Content standards',
    content: 'Find clinical codes, content and data formats to collect, process and share information consistently across care settings.'
  },
  technical: {
    link: 'Technical standards',
    content: 'Find technical specifications and APIs to exchange information with other technology products and services.'
  },
  services: {
    link: 'Services',
    content: 'Find central datasets and feeds to connect to and make use of national resources like NHS Email and Wifi.'
  }
}

function Panel({ path }) {
  return (
    <>
      <h4>
        <Link href={`standards/${path}`}>
          <a><Snippet inline>{`${path}.link`}</Snippet></a>
        </Link>
      </h4>
      <Snippet small>{`${path}.content`}</Snippet>
    </>
  );
}

export default function Standards() {

  return (
    <Page content={CONTENT}>
      <h1><Snippet inline>title</Snippet></h1>
      <Reading>
        <Snippet>intro</Snippet>
      </Reading>
      <Row>
        <Col>
          <Panel path="content" />
        </Col>
        <Col>
          <Panel path="technical" />
        </Col>
        <Col>
          <Panel path="services" />
        </Col>
      </Row>
    </Page>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      content: CONTENT
    }
  }
}
