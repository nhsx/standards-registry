import classnames from 'classnames';
import {
  Hero,
  Layout,
  Snippet,
  Search,
  Link,
  FeedbackFooter,
  Page,
} from '../components';
import styles from '../styles/Home.module.scss';
import { getPages } from '../helpers/api';
import { list } from '../helpers/api';
import { useContentContext } from '../context';

const staticPageContent = {
  header:
    'Discover standards that help things work together for service users in England',
  description:
    'Discover recognized published and future standards that help things work together for service users in health and adult social care within England.',
  intro:
    'Use this service to find out about recognized published and future standards in health and adult social care.',
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

export default function Home({ pages, host, ...props }) {
  const { contentMerge } = useContentContext();
  const pageContent = contentMerge(staticPageContent);
  const standardsPage = 'published-standards';
  return (
    <Page description={pageContent.description} host={host} {...props}>
      <HomeSection
        title="Browse by care setting"
        link={`/${standardsPage}`}
        linkText="Browse all care settings"
      >
        <HomeElement
          link={`/${standardsPage}?care_setting=Hospital`}
          linkText="Hospitals"
          description="Including discharges, referrals, dosing and screening."
        />
        <HomeElement
          link={`/${standardsPage}?care_setting=GP+%2F+Primary+care`}
          linkText="GP and Primary Care"
          description="Including referrals, diagnostics, and treatments."
        />
        <HomeElement
          link={`/${standardsPage}?care_setting=Social+care`}
          linkText="Social care"
          description="Including referrals, end of life and personalised care."
        />
      </HomeSection>

      <HomeSection
        title="Browse by topic"
        link={`/${standardsPage}`}
        linkText="Browse all topics"
      >
        <HomeElement
          link={`/${standardsPage}?topic=Appointment+%2F+scheduling`}
          linkText="Appointments"
          description="Including appointment bookings and clinical referrals."
        />
        <HomeElement
          link={`/${standardsPage}?topic=Access+to+records`}
          linkText="Access to records"
          description="Including retrieving structured information from care records."
        />
        <HomeElement
          link={`/${standardsPage}?topic=Vaccination`}
          linkText="Vaccination"
          description="Including immunisations and adverse reactions."
        />
      </HomeSection>
      <HomeSection
        title="Browse by type"
        link={`/${standardsPage}`}
        linkText="Browse all standard types"
        lineBreak={false}
      >
        <HomeElement
          link={`/search-results?standard_category=collections&order=asc&orderBy=name`}
          linkText="Collections"
          description="Includes commissioning, mental health, emergency and public health data sets and contract monitoring reporting."
        />
        <HomeElement
          link={`/search-results?standard_category=information+standards&order=asc&orderBy=name`}
          linkText="Information standards"
          description="Includes standards for clinical and care records and dictionaries for medicines, devices and data."
        />
        <HomeElement
          link={`/search-results?standard_category=Technical+standards+and+specifications&order=asc&orderBy=name`}
          linkText="Technical standards and specifications"
          description="Includes standards for interoperability and electronic data sharing."
        />
      </HomeSection>

      <div className="nhsuk-grid-row">
        {['future-standards', 'about-standards', 'help-and-resources'].map(
          (key) => {
            const page = pages.find((p) => p.name === key);
            if (page) {
              const { title, short_title, name, homepage_snippet } = page;
              const displayTitle = short_title || title;
              return (
                <SoloSection
                  key={key}
                  heading={displayTitle}
                  description={homepage_snippet}
                  link={`/${name}`}
                  linkText={`View ${displayTitle.toLowerCase()}`}
                />
              );
            }
          }
        )}
      </div>
      <FeedbackFooter />
    </Page>
  );
}

export function HomepageHero({ recent }) {
  const standardsPage = 'published-standards';
  return (
    <Hero>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-two-thirds">
          <h1 className={styles.title}>
            <Snippet inline>header</Snippet>
          </h1>
          <Snippet large>intro</Snippet>
          <Search placeholder="Search standards" navigate homepage />
        </div>
        <div className="nhsuk-grid-column-one-third">
          <div className={styles.sidebar}>
            <h2>Latest released standards</h2>
            <ul className="nhsuk-u-font-size-16" id="recent-standards">
              {recent.map((standard) => (
                <li key={standard.id}>
                  <Link href={`/${standardsPage}/${standard.name}`}>
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
  const recent = await list({
    sort: { release_date: 'desc' },
    is_published_standard: true,
  });
  const pages = await getPages();

  return {
    props: {
      recent:
        recent && recent.results
          ? recent.results

              .filter((item) => {
                if (!item.release_date) {
                  return false;
                }
                const [year, month, day] = item.release_date.split('-');
                const now = new Date();
                const itemDate = Date.parse(`${year}-${month}-${day}`);
                return itemDate <= now;
              })
              .slice(0, 3)
          : [],
      pages,
      content: staticPageContent,
    },
  };
}
