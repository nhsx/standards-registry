import classnames from 'classnames';
import styles from './style.module.scss';
import Link from '../Link';

export default function PhaseBanner({ homepage }) {
  return (
    <div
      className={classnames('nhsuk-phase-banner', styles.phaseBanner, {
        [styles.homepage]: homepage,
      })}
    >
      <div
        className={classnames('nhsuk-width-container', styles.inner, {
          [styles.homepage]: homepage,
        })}
      >
        <span className="nhsuk-u-font-size-14">
          <strong
            className={classnames('nhsuk-tag', styles.tag, {
              [styles.homepage]: homepage,
            })}
          >
            {' '}
            BETA{' '}
          </strong>
          <span className="nhsuk-phase-banner__text">
            This is a new service — your{' '}
            <Link
              className={classnames('nhsuk-phase-banner', styles.bannerLink, {
                [styles.homepage]: homepage,
              })}
              href="https://forms.gle/CKKi5nFzUjuxHB9N6"
              newWindow={true}
              text="feedback"
            />{' '}
            will help us to improve it.
          </span>
        </span>
      </div>
    </div>
  );
}
