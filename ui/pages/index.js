import classnames from 'classnames';
import { Hero, Layout, Snippet, Search, Link, FeedbackFooter } from '../components';
import styles from '../styles/Home.module.scss';
import { list } from '../helpers/api';
import React from 'react';

const content = {
  title: 'Home - Standards Directory',
  header:
    'Find standards for data and interoperability in health and social care',
  intro:
    'Use this directory to find nationally recognised information standards for interoperable technology in health and adult social care.',
};

const SoloSection = ({ heading, description, link, linkText }) => (
  <div
    className={classnames('nhsuk-grid-column-one-third', styles.lowerSection)}
  >
    <hr />
    <h2>{heading}</h2>
    <p>{description}</p>
    <p>
      <Link href={link}>{linkText}</Link>
    </p>
  </div>
);

const HomeSection = ({ children, title, link, linkText, lineBreak = true }) => (
  <div className={classnames('nhsuk-grid-row', styles.homeSection)}>
    <div className="nhsuk-grid-column-full">
      <h2>{title}</h2>
    </div>
    {children}
    <div className="nhsuk-grid-column-full">
      <p>
        <Link href={link}>{linkText}</Link>
      </p>
      {lineBreak ? (
        <hr className="nhsuk-section-break nhsuk-section-break--l nhsuk-section-break--visible" />
      ) : null}
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <HomeSection
        title="Browse by care setting"
        link="/standards"
        linkText="Browse all care settings"
      >
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?care_setting=Hospital">Hospital</Link>
          </h5>
          <p>
            Patient services, maternity, assessments, discharge, accident and
            emergency care.
          </p>
        </div>
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?care_setting=GP+%2F+Primary+care">
              GP / Primary Care
            </Link>
          </h5>
          <p>
            Physical and mental health, GP care records, diagnostics, clinical
            referrals, treatments.
          </p>
        </div>
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?care_setting=Social+care">Social care</Link>
          </h5>
          <p>
            Adult social care, social services, shared care records, community
            care and support.
          </p>
        </div>
      </HomeSection>

      <HomeSection
        title="Browse by topic"
        link="/standards"
        linkText="Browse all topics"
      >
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?topic=Appointment+%2F+scheduling">
              Appointments
            </Link>
          </h5>
          <p>
            Appointment booking and management, clinical referrals, key care
            information.
          </p>
        </div>
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?topic=Access+to+records">
              Access to records
            </Link>
          </h5>
          <p>
            Retrieve structured information from a patient and shared care
            records.
          </p>
        </div>
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?topic=Vaccination">Vaccination</Link>
          </h5>
          <p>
            Coronavirus (COVID-19), seasonal flu, immunisation, treatment and
            prevention protocols.
          </p>
        </div>
      </HomeSection>
      <HomeSection
        title="Browse by type"
        link="/standards"
        linkText="Browse all standard types"
        lineBreak={false}
      >
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?standard_category=Technical+standards+and+specifications">
              Technical specifications and APIs
            </Link>
          </h5>
          <p>
            Find technical standards to exchange information with other
            technology products and services.
          </p>
        </div>
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?standard_category=Record+standard">
              Clinical and care record standards
            </Link>
          </h5>
          <p>
            Explore clinical codes and data formats to collect, process and
            share information consistently.
          </p>
        </div>
        <div className="nhsuk-grid-column-one-third">
          <h5>
            <Link href="/standards?standard_category=Data+definitions+and+terminologies">
              Medical and data dictionaries
            </Link>
          </h5>
          <p>
            Use approved medical terminologies and definitions to support
            information systems.
          </p>
        </div>
      </HomeSection>

      <div className="nhsuk-grid-row">
        <SoloSection
          heading="Upcoming standards"
          description="Stay up to date with standards and APIs that are being proposed or drafted by standard development bodies."
          link="/roadmap"
          linkText="Search the roadmap"
        />
        <SoloSection
          heading="Guidance"
          description="Find out what information standards are and what interoperability
        means in health and social care."
          link="/what-information-standards-are"
          linkText="Learn more"
        />
        <SoloSection
          heading="Community"
          description="Connect with other health and social care professionals and share
        knowledge and best practice."
          link="/community"
          linkText="View the community resources"
        />
      </div>
      <FeedbackFooter />
    </>
  );
}

export function HomepageHero({ recent }) {
  return (
    <Hero>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-two-thirds">
          <h1 className={styles.title}>
            <Snippet inline>header</Snippet>
          </h1>
          <Snippet large>intro</Snippet>
          <Search placeholder="For example, FHIR, allergies, GP" navigate />
        </div>
        <div className="nhsuk-grid-column-one-third">
          <div className={styles.sidebar}>
            <h2>Latest standards</h2>
            <ul className="nhsuk-u-font-size-16" id="recent-standards">
              {recent.map((standard) => (
                <li key={standard.id}>
                  <Link href={`/standards/${standard.name}`}>
                    {standard.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/standards" className="nhsuk-u-font-size-16">
                Browse the latest standards
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Hero>
  );
}

function HomeLayout({ children, ...props }) {
  return (
    <Layout Hero={HomepageHero} {...props} homepage hideBannerSearch>
      {children}
    </Layout>
  );
}

Home.Layout = HomeLayout;

export async function getServerSideProps() {
  const recent = await list({ sort: { metadata_modified: 'desc' } });
  return {
    props: {
      recent: recent.results.slice(0, 3),
      content,
    },
  };
}
