import classnames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Snippet } from '../';
import styles from './style.module.scss';
import { useQueryContext } from '../../context/query';

export default function Pagination({ totalPages = 5, limit = 10, count = 50 }) {
  const router = useRouter();
  const page = parseInt(router.query.page, 10) || 1

  const from = count ? page * limit + 1 : 0;
  const to = (page + 1) * limit < count ? (page + 1) * limit : count;

  const pagesToShow = () => {
    const end = Math.min(totalPages, Math.max(5, page + 3));
    const start = Math.max(0, end - 5);
    return Array.from(Array(totalPages).keys()).slice(start, end);
  }

  return (
    <div className={classnames('nhsuk-pagination', styles.pagination)}>
      <div className={styles.summary}>
        <Snippet from={from} to={to} total={count} inline>pagination.summary</Snippet>
      </div>
      <ul>
        <li className={styles.item} id="prevButton">
          <Link href={`?page=${page - 1}`}>
            <a className={styles.link}>
              <span aria-hidden="true" role="presentation">
                «
              </span>
              Previous
            </a>
          </Link>
        </li>
        {
          pagesToShow().map(num => (
            <li className={styles.item} key={num}>
              <Link href={`?page=${num + 1}`}>
                <a className={classnames(styles.link, { [styles.current]: page === (num + 1) })}>
                   { num + 1 }
                </a>
              </Link>
            </li>
          ))
        }
        <li className={styles.item} id="nextButton">
          <a className={styles.link} href={`?page=${page + 1}`}>
            Next
            <span aria-hidden="true" role="presentation">
              »
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}
