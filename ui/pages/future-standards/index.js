import { upcomingStandard as schema } from '../../schema/future-standards';
import { getPageProps } from '../../helpers/getPageProps';
import { useState, useEffect } from 'react';
import { useQueryContext } from '../../context/query';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';
import axios from 'axios';
import omit from 'lodash/omit';
import {
  Page,
  Reading,
  Filters,
  Modal,
  ResponsiveTable,
  Pagination,
} from '../../components';

import styles from '../../styles/Roadmap.module.scss';

export default function Roadmap({ data, schemaData, page }) {
  const [results, setResults] = useState(data.results);
  const [count, setCount] = useState(data.count || 0);
  const [loading, setLoading] = useState(false);
  const { query } = useQueryContext();
  const [currentQuery, setCurrentQuery] = useState(query);

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

    if (!isEqual(query, currentQuery)) {
      getData();
      setCurrentQuery(query);
    }
    // we don't want to include loading in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentQuery]);

  const activeFilters = omit(query, 'q', 'page', 'orderBy', 'order');
  const numSelected = activeFilters.care_setting
    ? activeFilters.care_setting.length
    : 0;
  const resultSummary = `${count} result${count === 1 ? '' : 's'}`;

  const { title, content } = page;
  return (
    <Page {...page}>
      <Reading>
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <p>
          <strong>{resultSummary}</strong>
        </p>
      </Reading>
      <Modal
        trigger={`Filter by care setting (${numSelected})`}
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
        noBorderTop
      />
      <ResponsiveTable schema={schema} results={results} />
      <Pagination count={count} />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { id, defaultSort } = schema.find((s) => s.defaultSort);
  const pageProps = await getPageProps({
    ...context,
    query: {
      sort: {
        [id]: defaultSort,
      },
      ...context.query,
      inactive: true,
    },
  });
  const page = 'future-standards';
  pageProps.props.page = pageProps.props.pages
    .filter((i) => i.name === page)
    .pop();

  return pageProps;
}
