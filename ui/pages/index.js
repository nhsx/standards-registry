import Link from 'next/link';
import {
  Hero,
  Layout,
  Reading,
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

const CONTENT = {
  title: 'Join up IT systems in health and social care',
  intro:
    'Find standards, services and APIs to build interoperable technology in health and social care.',
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
    <Page content={CONTENT}>
      {sections.map((section) => Section(section, pages))}
    </Page>
  ) : null;
}

export function HomepageHero() {
  return (
    <Hero>
      <Reading>
        <h1 className={styles.title}>
          <Snippet inline>title</Snippet>
        </h1>
        <Snippet large>intro</Snippet>
        <Search placeholder="For example, FHIR, allergies, GP" />
      </Reading>
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
      content: CONTENT,
    },
  };
}
