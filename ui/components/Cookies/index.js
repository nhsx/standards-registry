import { useEffect, useState } from 'react';
import { setCookie, hasCookie } from 'cookies-next';
import classnames from 'classnames';
import styles from './style.module.scss';

export const Cookies = ({ choice }) => {
  const [consentChoice, setConsentChoice] = useState(choice);
  useEffect(() => {
    setConsentChoice(hasCookie('localConsent'));
  }, [choice]);

  const handleCookies = (choice) => {
    setConsentChoice(choice);
    setCookie('localConsent', choice, { maxAge: 60 * 60 * 24 * 365 });
  };

  return (
    (!consentChoice && (
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
              <a id="nhsuk-cookie-banner__link" href="/cookie-policy/">
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
                >
                  Do not use analytics cookies
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )) ||
    null
  );
};
