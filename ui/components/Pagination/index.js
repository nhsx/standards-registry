import classnames from 'classnames';
import { Snippet } from '../';
import styles from './style.module.scss';
import { useQueryContext } from '../../context/query';
import Link from 'next/link';

export default function Pagination({ limit = 10, count }) {
  const { query, getRoute, getQuery, updateQuery } = useQueryContext();
  const page = parseInt(query.page, 10) || 1;

  const totalPages = Math.ceil(count / limit);
  const from = count ? (page - 1) * limit + 1 : 0;
  const to = page * limit < count ? page * limit : count;

  const pagesToShow = () => {
    const end = Math.min(totalPages, Math.max(5, page + 2));
    const start = Math.max(0, end - 5);
    return Array.from(Array(totalPages).keys()).slice(start, end);
  };

  const pageLink = (props) =>
    [
      getRoute(),
      getQuery({
        ...query,
        ...props,
      }),
    ].join('?');

  return (
    <div className={classnames('nhsuk-pagination', styles.pagination)}>
      <div className={styles.summary}>
        <Snippet from={from} to={to} total={count} inline>
          pagination.summary
        </Snippet>
      </div>
      <ul>
        <li className={styles.item} id="prevButton">
          <Link
            replace={true}
            href={pageLink({
              page: page - 1,
            })}
          >
            <a
              className={classnames(styles.link, {
                [styles.current]: page <= 1,
              })}
            >
              « Previous
            </a>
          </Link>
        </li>
        {pagesToShow().map((num) => (
          <li className={styles.item} key={num}>
            <Link
              replace={true}
              href={pageLink({
                page: num + 1,
              })}
            >
              <a
                className={classnames(styles.link, {
                  [styles.current]: page === num + 1,
                })}
              >
                {num + 1}
              </a>
            </Link>
          </li>
        ))}
        <li className={styles.item} id="nextButton">
          <Link
            replace={true}
            href={pageLink({
              page: page + 1,
            })}
          >
            <a
              className={classnames(styles.link, {
                [styles.current]: page >= totalPages,
              })}
            >
              Next »
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
