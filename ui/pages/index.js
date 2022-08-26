import classnames from 'classnames';
import {
  Hero,
  Layout,
  Snippet,
  Search,
  Link,
  FeedbackFooter,
} from '../components';
import styles from '../styles/Home.module.scss';
import { list } from '../helpers/api';

const content = {
  title: 'NHS Standards Directory',
  header: 'Find standards to record, handle and exchange data in England',
  intro:
    'Use this directory to find nationally recognised standards for use in health and adult social care.',
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
    <div className="nhsuk-grid-column-full">
      <div className={styles.grid}>{children}</div>
    </div>
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

const HomeElement = ({ link, linkText, description }) => (
  <div className={styles.element}>
    <h3 className="nhsuk-heading-xs">
      <Link href={link}>{linkText}</Link>
    </h3>
    <p>{description}</p>
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
        <HomeElement
          link="/standards?care_setting=Hospital"
          linkText="Hospitals"
          description="Including discharges, referrals, dosing and screening."
        />
        <HomeElement
          link="/standards?care_setting=GP+%2F+Primary+care"
          linkText="GP and Primary Care"
          description="Including referrals, diagnostics, and treatments."
        />
        <HomeElement
          link="/standards?care_setting=Social+care"
          linkText="Social care"
          description="Including referrals, end of life and personalised care."
        />
      </HomeSection>

      <HomeSection
        title="Browse by topic"
        link="/standards"
        linkText="Browse all topics"
      >
        <HomeElement
          link="/standards?topic=Appointment+%2F+scheduling"
          linkText="Appointments"
          description="Including appointment bookings and clinical referrals."
        />
        <HomeElement
          link="/standards?topic=Access+to+records"
          linkText="Access to records"
          description="Including retrieving structured information from care records."
        />
        <HomeElement
          link="/standards?topic=Vaccination"
          linkText="Vaccination"
          description="Including immunisations and adverse reactions."
        />
      </HomeSection>
      <HomeSection
        title="Browse by type"
        link="/standards"
        linkText="Browse all standard types"
        lineBreak={false}
      >
        <HomeElement
          link="/standards?standard_category=Technical+standards+and+specifications"
          linkText="Technical standards and specifications"
          description="Including FHIR and HL7 standards for interoperability and APIs."
        />
        <HomeElement
          link="/standards?standard_category=Record+standard"
          linkText="Record standards"
          description="Including formatting standards for clinical and care records."
        />
        <HomeElement
          link="/standards?standard_category=Data+definitions+and+terminologies"
          linkText="Data definitions and terminologies"
          description="Including dictionaries for medicines, devices and data."
        />
      </HomeSection>

      <div className="nhsuk-grid-row">
        <SoloSection
          heading="Future standards"
          description="Check standards being developed or proposed as future requirements in England."
          link="/roadmap"
          linkText="View future standards"
        />
        <SoloSection
          heading="About standards"
          description="Get an introduction to standards and interoperability in health and adult social care."
          link="/what-information-standards-are"
          linkText="View about standards"
        />
        <SoloSection
          heading="Help and resources"
          description="Explore contacts and resources for teams building or buying technology in England."
          link="/help-and-resources"
          linkText="View help and resources"
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
          <Search
            placeholder="For example, FHIR, allergies, GP"
            navigate
            homepage
          />
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
