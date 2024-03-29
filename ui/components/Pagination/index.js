import classnames from 'classnames';
import { Snippet } from '../';
import styles from './style.module.scss';
import { useQueryContext } from '../../context/query';
import Link from 'next/link';

export default function Pagination({ limit = 10, count }) {
  const { query, getRoute, updateQuery } = useQueryContext();
  const page = parseInt(query.page, 10) || 1;

  const totalPages = Math.ceil(count / limit);
  const from = count ? (page - 1) * limit + 1 : 0;
  const to = page * limit < count ? page * limit : count;

  const pagesToShow = () => {
    const end = Math.min(totalPages, Math.max(5, page + 2));
    const start = Math.max(0, end - 5);
    return Array.from(Array(totalPages).keys()).slice(start, end);
  };

  const pageLink = (props) => {
    return {
      pathname: getRoute(),
      query: { ...query, ...props },
    };
  };

  const changePage = (page) => (e) => {
    e.preventDefault();
    updateQuery({ ...query, page });
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className={classnames('nhsuk-pagination', styles.pagination)}
    >
      <div className={styles.summary}>
        <Snippet from={from} to={to} total={count} inline>
          pagination.summary
        </Snippet>
      </div>
      <ul>
        <li className={styles.item} id="prevButton">
          <Link
            shallow={true}
            href={
              page <= 1
                ? '#'
                : pageLink({
                    page: page - 1,
                  })
            }
          >
            <a
              aria-label="Previous page"
              className={classnames(styles.link, {
                [styles.current]: page <= 1,
              })}
              onClick={changePage(page - 1)}
            >
              « Previous
            </a>
          </Link>
        </li>
        {pagesToShow().map((num) => (
          <li className={styles.item} key={num}>
            <Link
              shallow={true}
              href={pageLink({
                page: num + 1,
              })}
            >
              <a
                aria-current={page === num + 1 ? 'page' : null}
                aria-label={`Goto Page ${num + 1}`}
                className={classnames(styles.link, {
                  [styles.current]: page === num + 1,
                })}
                onClick={changePage(num + 1)}
              >
                {num + 1}
              </a>
            </Link>
          </li>
        ))}
        <li className={styles.item} id="nextButton">
          <Link
            shallow={true}
            href={
              page >= totalPages
                ? '#'
                : pageLink({
                    page: page + 1,
                  })
            }
          >
            <a
              aria-label="Next page"
              className={classnames(styles.link, {
                [styles.current]: page >= totalPages,
              })}
              onClick={changePage(page + 1)}
            >
              Next »
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
