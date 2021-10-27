import { parse } from 'url'
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Snippet } from '../';
import styles from './style.module.scss';
import { useQueryContext } from '../../context/query';

export default function Pagination({ limit = 10, count }) {
  const { query, setQuery, getQuery } = useQueryContext();
  const router = useRouter();
  const page = parseInt(query.page, 10) || 1;

  const totalPages = Math.ceil(count / limit);
  const from = count ? (page - 1) * limit + 1 : 0;
  const to = page * limit < count ? page * limit : count;

  const pagesToShow = () => {
    const end = Math.min(totalPages, Math.max(5, page + 2));
    const start = Math.max(0, end - 5);
    return Array.from(Array(totalPages).keys()).slice(start, end);
  }

  function href(change) {
    const url = parse(router.asPath);
    return `${url.pathname}?${getQuery({ page: change })}`
  }

  return (
    <div className={classnames('nhsuk-pagination', styles.pagination)}>
      <div className={styles.summary}>
        <Snippet from={from} to={to} total={count} inline>pagination.summary</Snippet>
      </div>
      <ul>
        <li className={styles.item} id="prevButton">
          <Link href={href(page - 1)}>
            <a className={classnames(styles.link, { [styles.current]: page <= 1 })}>« Previous</a>
          </Link>
        </li>
        {
          pagesToShow().map(num => (
            <li className={styles.item} key={num}>
              <Link href={href(num + 1)}>
                <a className={classnames(styles.link, { [styles.current]: page === (num + 1) })}>
                  { num + 1 }
                </a>
              </Link>
            </li>
          ))
        }
        <li className={styles.item} id="nextButton">
          <a className={classnames(styles.link, { [styles.current]: page >= totalPages })} href={href(page + 1)}>Next »</a>
        </li>
      </ul>
    </div>
  )
}
