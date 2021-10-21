import Link from 'next/link';
import { Hero, Layout, Reading, Page, Snippet, Search, Row, Col, Card } from '../components';
import styles from '../styles/Home.module.scss';

const CONTENT = {
  title: 'Join up IT systems in health and social care',
  intro: 'Find standards, services and APIs to build interoperable technology in health and social care.'
}

export default function Home() {
  return (
    <Page content={CONTENT}>
      <h3>Directory</h3>
      <Row>
        <Col>
          <Link href="/standards">
            <a>
              <Card clickable className={styles.card}>
                <h5>Browse directory</h5>
                <p className="nhsuk-body-s">Explore all standards, APIs and services</p>
              </Card>
            </a>
          </Link>
        </Col>
        <Col colspan="2"></Col>
      </Row>

    </Page>
  )
}

export function HomepageHero() {
  return (
    <Hero>
      <Reading>
        <h1 className={styles.title}><Snippet inline>title</Snippet></h1>
        <Snippet large>intro</Snippet>
        <Search placeholder="For example, FHIR, allergies, GP" />
      </Reading>
    </Hero>
  )
}

function HomeLayout({ children }) {
  return (
    <Layout Hero={HomepageHero} homepage>
      {children}
    </Layout>
  )
}

Home.Layout = HomeLayout;

export async function getStaticProps() {
  return {
    props: {
      content: CONTENT
    }
  }
}
