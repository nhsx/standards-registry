import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Analytics,
  Breadcrumbs,
  Navigation,
  PhaseBanner,
  Search,
  Col,
  Row,
} from '../';
import { useContentContext } from '../../context/content';
import styles from './style.module.scss';
import classnames from 'classnames';

export default function Home({ children, ...props }) {
  useRouter();
  const { content } = useContentContext();
  const { title } = content;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <a className="nhsuk-skip-link" href="#maincontent">
        Skip to main content
      </a>

      <header className="nhsuk-header" role="banner">
        <div className="nhsuk-width-container nhsuk-header__container">
          <Row>
            <Col colspan={2}>
              <div className="nhsuk-header__logo">
                <Link href="/">
                  <a
                    className={classnames(
                      'nhsuk-header__link nhsuk-header__link--service',
                      styles.logo
                    )}
                    aria-label="NHS homepage"
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
                      Standards Directory
                    </span>
                  </a>
                </Link>
              </div>
            </Col>
            <Col>
              {!props.hideBannerSearch && (
                <Search label={false} placeholder="Search" location="nav" />
              )}
            </Col>
          </Row>
        </div>
        <Navigation />
      </header>

      <Breadcrumbs
        labels={{
          standards: 'Published standards',
          content: 'Browse content standards',
          technical: 'Browse technical standards',
          services: 'Browse services',
        }}
      />

      <PhaseBanner homepage={props.homepage} />

      {props.Hero && <props.Hero {...props} />}

      <div className="nhsuk-width-container">
        <main className={styles.main} id="maincontent" role="main">
          {children}
        </main>
      </div>

      <footer role="contentinfo">
        <div className="nhsuk-footer" id="nhsuk-footer">
          <div className="nhsuk-width-container">
            <p className="nhsuk-footer__copyright">&copy; Crown copyright</p>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
