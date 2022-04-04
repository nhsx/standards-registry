import Link from 'next/link';
import {
  Hero,
  Layout,
  Snippet,
  Search,
} from '../components';
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

export default function Home() {
  return <>
    <div className="nhsuk-grid-row">
      <div className="nhsuk-grid-column-full">
        <h2>Browse by care setting</h2>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?care_setting=Hospital">Hospital</Link></h3>
        <p>Patient services, maternity, assessments, discharge, accident and emergency care.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?care_setting=GP+%2F+Primary+care">GP / Primary Care</Link></h3>
        <p>Physical and mental health, GP care records, diagnostics, clinical referrals, treatments.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?care_setting=Social+care">Social care</Link></h3>
        <p>Adult social care, social services, shared care records, community care and support.</p>
      </div>
      <div className="nhsuk-grid-column-full">
        <p><Link href="/standards">Browse all care settings</Link></p>
      </div>
    </div>
    <div className="nhsuk-grid-row">
      <div className="nhsuk-grid-column-full">
        <h2>Browse by topic</h2>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?business_use=Appointment+%2F+scheduling">Appointments</Link></h3>
        <p>Appointment booking and management, clinical referrals, key care information.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?business_use=Access+to+records">Access to records</Link></h3>
        <p>Retrieve structured information from a patient and shared care records.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?business_use=Vaccination">Vaccination</Link></h3>
        <p>Coronavirus (COVID-19), seasonal flu, immunisation, treatment and prevention protocols.</p>
      </div>
      <div className="nhsuk-grid-column-full">
        <p><Link href="/standards">Browse all topics</Link></p>
      </div>
    </div>
    <div className="nhsuk-grid-row">
      <div className="nhsuk-grid-column-full">
        <h2>Browse by type</h2>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?standard_category=Technical+standards+and+specifications">Technical specifications and APIs</Link></h3>
        <p>Find technical standards to exchange information with other technology products and services.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?standard_category=Record+standard">Clinical and care record standards</Link></h3>
        <p>Explore clinical codes and data formats to collect, process and share information consistently.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h3><Link href="/standards?standard_category=Data+definitions+and+terminologies">Medical and data dictionaries</Link></h3>
        <p>Use approved medical terminologies and definitions to support information systems.</p>
      </div>
      <div className="nhsuk-grid-column-full">
        <p><Link href="/standards">Browse all standard types</Link></p>
      </div>
    </div>

    <div className="nhsuk-grid-row">
      <div className="nhsuk-grid-column-one-third">
        <h2><Link href="#">Upcoming standards</Link></h2>
        <p>Stay up to date with standards and APIs that are being proposed or drafted by standard development bodies.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h2><Link href="/what-information-standards-are">Guidance</Link></h2>
        <p>Find out what information standards are and what interoperability means in health and social care.</p>
      </div>
      <div className="nhsuk-grid-column-one-third">
        <h2><Link href="#">Community</Link></h2>
        <p>Connect with other health and social care professionals and share knowledge and best practice.</p>
      </div>
    </div>

  </>
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
          <Search placeholder="For example, FHIR, allergies, GP" />
        </div>
        <div className="nhsuk-grid-column-one-third">
          <div className={styles.sidebar}>
            <h2>Latest standards</h2>
            <ul>
              {
                recent.map(standard => (
                  <li key={standard.id}><Link href={`/standards/${standard.name}`}>{ standard.title }</Link></li>
                ))
              }
            </ul>
            <p><Link href="/standards">Browse the latest standards and APIs</Link></p>
          </div>
        </div>
      </div>


    </Hero>
  );
}

function HomeLayout({ children, ...props }) {
  return (
    <Layout Hero={HomepageHero} {...props} homepage hideSearch>
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
