import classnames from 'classnames';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import compact from 'lodash/compact';
import get from 'lodash/get';
import { useModelContext } from '../../context/model';
import styles from './style.module.scss';

function uppercaseFirst(str) {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
}

export default function Breadcrumbs({ labels, title = false }) {
  const context = useModelContext();
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const path = router.asPath.trim().split('?').shift().split('#').shift();
      const linkPath = path.trim().split('/');
      linkPath.shift();

      const pathArray = compact(linkPath).map((path, i) => {
        return {
          value: path,
          href: `/${linkPath.slice(0, i + 1).join('/')}`,
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  function convertBreadcrumb(string) {
    return get(labels, string, uppercaseFirst(string.replace(/-/g, ' ')));
  }

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  // lookup model label
  function getLabel(page) {
    if (context && context.id === page) {
      return context.data.title;
    }
    return convertBreadcrumb(page);
  }

  return (
    <nav className={classnames('nhsuk-breadcrumbs', styles.breadcrumbs)}>
      <div className="nhsuk-width-container">
        <ol
          className={classnames(
            'nhsuk-breadcrumb__list',
            styles.breadcrumbList
          )}
        >
          <li className="nhsuk-breadcrumb__item">
            <Link className="nhsuk-breadcrumb__link" href="/">
              <a>Home</a>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, i) => (
            <li key={breadcrumb.href} className="nhsuk-breadcrumb__item">
              {i < breadcrumbs.length - 1 ? (
                <Link href={breadcrumb.href} className="nhsuk-breadcrumb__link">
                  <a>{getLabel(breadcrumb.value)}</a>
                </Link>
              ) : title ? (
                title
              ) : (
                getLabel(breadcrumb.value)
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
