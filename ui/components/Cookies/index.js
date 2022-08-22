import { useEffect, useState } from 'react';
import { setCookie, hasCookie } from 'cookies-next';
import classnames from 'classnames';
import styles from './style.module.scss';

// import { useRouter } from 'next/router';
// import ReactGA from 'react-ga4';

export const Cookies = () => {
  // const router = useRouter();

  useEffect(() => {
    setConsentChoice(hasCookie('localConsent'));
  }, []);

  const [consentChoice, setConsentChoice] = useState(true);

  const handleCookies = (choice) => {
    setConsentChoice(true);
    setCookie('localConsent', choice, { maxAge: 60 * 60 * 24 * 365 });
  };

  return (
    !consentChoice && (
      <div id="nhsuk-cookie-banner" data-nosnippet="true">
        <div
          className={classnames('nhsuk-cookie-banner', styles.banner)}
          id="cookiebanner"
        >
          <div className="nhsuk-width-container">
            <h2 className="nhsuk-heading-s">
              Cookies on the NHS Standards Directory
            </h2>
            <p>
              We use essential cookies to make this service work. We&lsquo;d
              also like to use other cookies to see how you use the service and
              make it better. Please accept if that&lsquo;s OK.
            </p>
            <p>
              You can{' '}
              <a
                id="nhsuk-cookie-banner__link"
                href="/cookie-policy/"
                tabIndex="1"
              >
                read more about our cookies
              </a>{' '}
              before you choose.
            </p>
            <ul className={classnames(styles.list)}>
              <li className={classnames(styles.listItem)}>
                <button
                  onClick={() => handleCookies(true)}
                  className="nhsuk-button"
                  id="nhsuk-cookie-banner__link_accept_analytics"
                  href="#"
                  tabIndex="2"
                >
                  I&lsquo;m OK with analytics cookies
                </button>
              </li>
              <li className={classnames(styles.listItem)}>
                <button
                  onClick={() => handleCookies(false)}
                  className="nhsuk-button"
                  id="nhsuk-cookie-banner__link_accept"
                  href="#"
                  tabIndex="3"
                >
                  Do not use analytics cookies
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

// useEffect(() => {
//   if (!process.env.NEXT_PUBLIC_TRACKING_ID) {
//     return null;
//   }
//   // https://www.npmjs.com/package/react-ga4
//   ReactGA.initialize([
//     {
//       trackingId: process.env.NEXT_PUBLIC_TRACKING_ID,
//       gaOptions: {}, // optional
//       gtagOptions: {}, // optional
//     },
//     // {
//     //   trackingId: 'your second GA measurement id',
//     // },
//   ]);

//   const handleRouteChange = (url) => {
//     if (process.env.NODE_ENV === 'production') {
//       ReactGA.send({ hitType: 'pageview', page: url });
//     }
//   };
//   router.events.on('routeChangeComplete', handleRouteChange);

//   return () => router.events.off('routeChangeComplete', handleRouteChange);
// }, [router]);
