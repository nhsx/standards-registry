import Link from '../Link';

import styles from './style.module.scss';

export function FeedbackFooter() {
  return (
    <div className={styles.feedback}>
      <h2 id="feedback" className="nhsuk-heading-s">
        Feedback
      </h2>
      <p className="nhsuk-u-font-size-16">
        This is a new service — your{' '}
        <Link
          newWindow={true}
          href="https://forms.gle/CKKi5nFzUjuxHB9N6"
          text="feedback"
        />{' '}
        will help us to improve it.
      </p>
    </div>
  );
}
