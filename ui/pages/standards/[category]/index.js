import { Reading, Snippet, Page, Row, Col, Filters, Dataset } from '../../../components';

const CONTENT = {
  content: {
    title: 'Browse content standards',
    intro: 'Find clinical codes, content and data formats to collect and share information in health and social care settings in England.',
    filters: {
      summary: 'Showing {{num}} content standard{{#plural}}s{{/plural}}'
    }
  },
  technical: {
    title: 'Browse technical standards',
    intro: 'Find technical specifications and APIs to build technology products for health and social care settings in England.',
    filters: {
      summary: 'Showing {{num}} technical standard{{#plural}}s{{/plural}}'
    }
  },
  services: {
    title: 'Browse services',
    intro: 'Find central datasets to connect to and make use of national resources like NHS Email and Wifi.',
    filters: {
      summary: 'Showing {{num}} service{{#plural}}s{{/plural}}'
    }
  }
}

const filters = [
  {
    title: 'Topic',
    options: [
      {
        label: 'Appointment / Scheduling',
        value: 'Scheduling'
      },
      {
        label: 'Referrals',
        value: 'Referrals'
      },
      {
        label: 'Access to records',
        value: 'access'
      },
      {
        label: 'Clinical decision support',
        value: 'clinical'
      }
    ]
  },
  {
    title: 'Programme',
    options: [
      {
        label: 'Appointment / Scheduling',
        value: 'Scheduling'
      },
      {
        label: 'Referrals',
        value: 'Referrals'
      },
      {
        label: 'Access to records',
        value: 'access'
      },
      {
        label: 'Clinical decision support',
        value: 'clinical'
      }
    ]
  },
  {
    title: 'Care settings',
    options: [
      {
        label: 'Appointment / Scheduling',
        value: 'Scheduling'
      },
      {
        label: 'Referrals',
        value: 'Referrals'
      },
      {
        label: 'Access to records',
        value: 'access'
      },
      {
        label: 'Clinical decision support',
        value: 'clinical'
      }
    ]
  }
]

export default function Category({ data }) {
  return (
    <Page>
      <h1><Snippet inline>title</Snippet></h1>
      <Reading>
        <Snippet>intro</Snippet>
      </Reading>
      <Row>
        <Col>
          <Filters filters={filters} />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} />
        </Col>
      </Row>
    </Page>
  )
}

// export async function getStaticPaths() {
//   return {
//     paths: ['/standards/content', '/standards/technical', '/standards/services'],
//     fallback: false
//   }
// }

export async function getServerSideProps(context) {
  const { category } = context.params;

  const content = CONTENT[category];

  const res = await fetch(`http://localhost:3000/api/standards/content`);
  const data = await res.json();

  return {
    props: {
      data,
      content
    }
  }

}
