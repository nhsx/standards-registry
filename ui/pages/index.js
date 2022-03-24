import Link from 'next/link';
import {
  Hero,
  Layout,
  Page,
  Snippet,
  Search,
  Row,
  Col,
  Card,
} from '../components';
import styles from '../styles/Home.module.scss';
import { getPages } from '../helpers/api';
import React from 'react';

const content = {
  title: 'Home - Standards Directory',
  header:
    'Find standards and APIs to support data sharing in health and social care',
  intro:
    'Use this directory to find nationally recognised information standards and APIs needed to build interoperable technology.',
};

const Section = (section, pages) => {
  const items = pages.filter((i) => i.homepage_section === section);
  return (
    <React.Fragment key={section}>
      <h3>{section}</h3>
      <Row>
        {items.map((pageItem, index) => {
          const {
            name,
            title,
            short_title: shortTitle,
            homepage_snippet: snippet,
            add_to_home_page: addToHomepage,
          } = pageItem;
          if (!addToHomepage) {
            return null;
          }
          return (
            <Col key={index}>
              <Link href={`/${name}`}>
                <a>
                  <Card clickable className={styles.card}>
                    <h5>{shortTitle || title}</h5>
                    <p className="nhsuk-body-s">{snippet}</p>
                  </Card>
                </a>
              </Link>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default function Home({ pages }) {
  const sections = [
    ...new Set(pages.map((i) => i.homepage_section).filter((i) => i)),
  ];
  return pages ? (
    <Page content={content} title={content.title}>
      {sections.map((section) => Section(section, pages))}
    </Page>
  ) : null;
}

export function HomepageHero() {
  return (
    <Hero>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-two-thirds">
          <h1 className={styles.title}>
            <Snippet inline>header</Snippet>
          </h1>
          <Snippet large>intro</Snippet>
        </div>
        <div className="nhsuk-grid-column-one-third">
        </div>
      </div>

      <Search placeholder="For example, FHIR, allergies, GP" />
    </Hero>
  );
}

function HomeLayout({ children }) {
  return (
    <Layout Hero={HomepageHero} homepage hideSearch>
      {children}
    </Layout>
  );
}

Home.Layout = HomeLayout;

export async function getServerSideProps() {
  return {
    props: {
      pages: await getPages(),
      content,
    },
  };
}
