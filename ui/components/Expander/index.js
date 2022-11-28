import { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './Expander.module.scss';

export default function Expander({
  summary,
  children,
  className,
  small,
  title,
  open = false,
  noBorderTop,
}) {
  const [isOpen, setOpen] = useState(open);
  useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <details
      title={title}
      className={classnames('nhsuk-details', className, styles.details, {
        [styles['no-border-top']]: noBorderTop,
      })}
      open={isOpen}
    >
      <summary className={classnames('nhsuk-details__summary', styles.summary)}>
        {summary}
      </summary>
      <div className={classnames('nhsuk-details__text', styles.detailsText)}>
        {children}
      </div>
    </details>
  );
}
