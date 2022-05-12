import Link from '../Link';

import styles from './style.module.scss';

export function FeedbackFooter() {
  return (
    <div className={styles.feedback}>
      <h2 id="feedback" className="nhsuk-heading-s">
        Feedback
      </h2>
      <p className="nhsuk-u-font-size-16">
        Let us know about your visit to the standards directory today by filling in
        {' '}
        <Link
          newWindow={true}
          href="https://forms.gle/CKKi5nFzUjuxHB9N6"
          text="our survey"
        />
        .
      </p>
    </div>
  );
}
