import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Analytics,
  Cookies,
  Breadcrumbs,
  Flex,
  Navigation,
  PhaseBanner,
  Search,
} from '../';
import get from 'lodash/get';
import { useContentContext } from '../../context/content';
import styles from './style.module.scss';
import classnames from 'classnames';
import { usePages } from '../../context';

const isDevelopment = process.env.NEXT_PUBLIC_ENV !== 'prod';

export default function Home({ children, ...props }) {
  const pages = usePages();
  useRouter();

  const siteCode = process.env.NEXT_PUBLIC_SITE_CODE;

  const links = [
    'published-standards',
    'future-standards',
    'about-standards',
    'help-and-resources',
  ].map((name) => {
    const page = pages.find((p) => p.name === name);
    return {
      url: `/${page.name}`,
      label: page.short_title || page.title,
    };
  });

  const { content } = useContentContext();
  const { title, headerTitle } = content;

  const datasetTitle = get(props, 'data.title');

  function toggleNav() {
    const el = document.querySelector('#header-navigation');
    if (Array.from(el.classList).includes('js-show')) {
      el.classList.remove('js-show');
    } else {
      el.classList.add('js-show');
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{headerTitle}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="google-site-verification" content={siteCode} />

        {isDevelopment && <meta name="robots" content="noindex" />}

        {props.metaDescription && (
          <meta name="description" content={props.metaDescription} />
        )}
      </Head>
      <Analytics />
      <a className="nhsuk-skip-link" href="#maincontent">
        Skip to main content
      </a>

      <Cookies />

      <header className="nhsuk-header">
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo">
            <Link href="/">
              <a
                className={classnames(
                  'nhsuk-header__link nhsuk-header__link--service',
                  styles.logo
                )}
                aria-label={`${title} - home page`}
              >
                <svg
                  className="nhsuk-logo"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 16"
                  height="40"
                  width="100"
                >
                  <path
                    className="nhsuk-logo__background"
                    fill="#005eb8"
                    d="M0 0h40v16H0z"
                  ></path>
                  <path
                    className="nhsuk-logo__text"
                    fill="#fff"
                    d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"
                  ></path>
                </svg>
                <span
                  className={classnames(
                    'nhsuk-header__service-name',
                    styles.serviceName
                  )}
                >
                  {headerTitle}
                </span>
              </a>
            </Link>
          </div>
          <div className="nhsuk-header__content" id="content-header">
            <div className="nhsuk-header__menu">
              <button
                className="nhsuk-header__menu-toggle"
                type="button"
                id="toggle-menu"
                aria-controls="header-navigation"
                aria-expanded="false"
                onClick={toggleNav}
              >
                Menu
              </button>
            </div>
            {!props.hideBannerSearch && (
              <Search placeholder="Search all standards" location="nav" />
            )}
          </div>
        </div>

        <Navigation links={links} />
      </header>

      <main className={styles.main} id="maincontent">
        <PhaseBanner homepage={props.homepage} />
        {props.Hero && <props.Hero {...props} />}
        <Breadcrumbs
          labels={{
            standards: 'Published standards',
            content: 'Browse content standards',
            technical: 'Browse technical standards',
            services: 'Browse services',
          }}
          title={datasetTitle}
        />
        <div className="nhsuk-width-container">{children}</div>
      </main>

      <footer>
        <div className="nhsuk-footer" id="nhsuk-footer">
          <div className="nhsuk-width-container">
            <h2 className="nhsuk-u-visually-hidden">Support links</h2>
            <Flex>
              <ul className="nhsuk-footer__list">
                <li className="nhsuk-footer__list-item">
                  <Link
                    href="/accessibility-statement"
                    className="nhsuk-footer__list-item-link"
                  >
                    Accessibility statement
                  </Link>
                </li>
                <li className="nhsuk-footer__list-item">
                  <Link
                    href="/cookie-policy"
                    className="nhsuk-footer__list-item-link"
                  >
                    Cookies
                  </Link>
                </li>
                <li className="nhsuk-footer__list-item">
                  <Link
                    href="/privacy-policy"
                    className="nhsuk-footer__list-item-link"
                  >
                    Privacy
                  </Link>
                </li>
                <li className="nhsuk-footer__list-item">
                  <Link
                    href="/site-map"
                    className="nhsuk-footer__list-item-link"
                  >
                    Site map
                  </Link>
                </li>
                <li className="nhsuk-footer__list-item">
                  <Link
                    href="/about-this-service"
                    className="nhsuk-footer__list-item-link"
                  >
                    About this service
                  </Link>
                </li>
                <li className="nhsuk-footer__list-item">
                  <a
                    className="nhsuk-footer__list-item-link"
                    href="mailto:england.interop.standards@nhs.net"
                  >
                    Contact: england.interop.standards@nhs.net
                  </a>
                </li>
              </ul>
            </Flex>
          </div>
          <div className="nhsuk-width-container">
            <p
              className={classnames(
                'nhsuk-footer__copyright',
                styles.copyrightLink
              )}
            >
              &copy; Crown copyright
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
