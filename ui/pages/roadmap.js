import { upcomingStandard as schema } from '../schema';
import { getPageProps } from '../helpers/getPageProps';
import { useState, useEffect } from 'react';
import { useQueryContext } from '../context/query';
import classnames from 'classnames';
import axios from 'axios';
import { Page, Reading, Filters, Modal, ResponsiveTable } from '../components';

import styles from '../styles/Roadmap.module.scss';

export default function Roadmap({ data, schemaData }) {
  const [results, setResults] = useState(data.results);
  const [count, setCount] = useState(data.count || 0);
  const [loading, setLoading] = useState(false);
  const { query } = useQueryContext();

  useEffect(() => {
    if (loading) {
      return;
    }

    async function getData() {
      try {
        setLoading(true);
        const res = await axios.post('/api/refresh-list', {
          ...query,
          inactive: true,
        });
        const { count, results } = res.data;
        setResults(results);
        setCount(count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [query, loading]);

  const resultSummary = `${count} result${count === 1 ? '' : 's'}`;

  return (
    <Page>
      <Reading>
        <h1>Roadmap of future requirements in England</h1>
        <p>
          Find standards being assessed by the Data Alliance Partnership Board
          with a view to mandatory implementation in England. For more
          information or to propose a new standard email
          england.interop.standards@nhs.net
        </p>
        <p>
          <strong>{resultSummary}</strong>
        </p>
      </Reading>
      <Modal
        trigger="Filter by care setting"
        closeLabel="Back to results"
        className={styles.onlyMobile}
        closeButton="Show results"
      >
        <Filters
          schema={schemaData}
          before={<p>{resultSummary}</p>}
          categories={['care_setting']}
          showTitle
          expanded
          clearAll
          fullHeight
        />
      </Modal>
      <Filters
        schema={schemaData}
        categories={['care_setting']}
        className={classnames(styles.onlyDesktop, styles.threeColumn)}
        clearAll
      />
      <ResponsiveTable schema={schema} results={results} />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageProps({ query: { ...context.query, inactive: true } });
}
