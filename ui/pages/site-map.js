import { Fragment } from 'react';
import { Page } from '../components';
import Link from 'next/link';
import { getPages } from '../helpers/api';

const SiteMap = ({ pages }) => {
  const feedbackLink =
    'https://docs.google.com/forms/d/e/1FAIpQLSc3t0kyD6f8kkvgRnqtj5uUmozq_oACBWrOqhrDBmzzqlfRHA/viewform';

  const homeSections = [
    {
      title: 'Browse by care setting',
      category: 'care_setting',
      filters: [
        {
          filter: 'Hospital',
          title: 'Hospitals',
        },
        {
          filter: 'GP+%2F+Primary+care',
          title: 'GP and primary care',
        },
        {
          filter: 'Social+care',
          title: 'Social care',
        },
        {
          filter: null,
          title: 'Browse all care settings',
        },
      ],
    },
    {
      title: 'Browse by topic',
      category: 'topic',
      filters: [
        {
          filter: 'Appointment+%2F+scheduling',
          title: 'Appointments',
        },
        {
          filter: 'Access+to+records',
          title: 'Access to records',
        },
        {
          filter: 'Vaccination',
          title: 'Vaccination',
        },
        {
          filter: null,
          title: 'Browse all topics',
        },
      ],
    },
    {
      title: 'Browse by type',
      category: 'standard_category',
      filters: [
        {
          filter: 'Technical+standards+and+specifications',
          title: 'Technical standards and specifications',
        },
        {
          filter: 'Record+standard',
          title: 'Record standards',
        },
        {
          filter: 'Data+definitions+and+terminologies',
          title: 'Data definitions and terminologies',
        },
        {
          filter: null,
          title: 'Browse all standard types',
        },
      ],
    },
  ];

  const children = {
    'about-standards': [
      {
        anchor: 'what-we-mean-by-standards',
        title: 'What we mean by standards',
      },
      {
        anchor: 'benefits-of-using-standards',
        title: 'Benefits to patients and staff',
      },
      {
        anchor: 'report-a-gap-in-standards',
        title: 'Report a gap in standards',
      },
    ],
    'help-and-resources': [
      {
        anchor: 'standards-directory-team',
        title: 'Standards Directory team',
      },
      {
        anchor: 'standard-development-bodies',
        title: 'Standard development bodies',
      },
      {
        anchor: 'discussion-forums',
        title: 'Discussion forums',
      },
      {
        anchor: 'technology-regulations',
        title: 'Technology regulations',
      },
      {
        anchor: 'platforms-for-buying-and-selling-it',
        title: 'Platforms for buying and selling IT',
      },
      {
        anchor: 'design-kits-and-case-studies',
        title: 'Design kits and case studies',
      },
    ],
    'about-this-service': [
      {
        anchor: 'what-this-service-does',
        title: 'What this service does',
      },
      {
        anchor: 'who-this-service-is-for',
        title: 'Who this service is for',
      },
      {
        anchor: 'what-standards-are-included',
        title: 'What standards are included',
      },
      {
        anchor: 'who-manages-this-service',
        title: 'Who manages this service',
      },
    ],
  };

  const orderedPages = [
    'current-standards',
    'future-standards',
    'about-standards',
    'help-and-resources',
    'accessibility-statement',
    'cookie-policy',
    'privacy-policy',
    'about-this-service',
  ].map((page) => pages.find((p) => p.name === page));

  const pageProps = {
    title: 'Site map',
    description: 'View a complete list of pages in our website.',
  };

  return (
    <Page {...pageProps}>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-two-thirds">
          <h1>Site map</h1>
          <ul>
            <li>
              <p>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </p>
              {homeSections.map(({ title, filters, category }) => {
                return (
                  <Fragment key={category}>
                    <h5>{title}</h5>
                    <ul>
                      {filters.map(({ filter, title }) => {
                        const query = filter ? `?${category}=${filter}` : '';
                        return (
                          <li key={filter}>
                            <Link href={`/current-standards${query}`}>
                              <a>{title}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Fragment>
                );
              })}
            </li>

            {orderedPages.map((page, index) => {
              return (
                <li key={index}>
                  <p>
                    <Link href={`/${page.name}`}>
                      <a>{page.short_title || page.title}</a>
                    </Link>
                  </p>
                  {children[page.name] && (
                    <ul>
                      {children[page.name].map((child, index) => {
                        return (
                          <li key={index}>
                            <Link href={`/${page.name}#${child.anchor}`}>
                              <a>{child.title}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            <li>
              <Link href={feedbackLink}>
                <a>Feedback</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Page>
  );
};

export default SiteMap;

export async function getServerSideProps() {
  const pages = await getPages();

  return {
    props: {
      pages,
    },
  };
}
