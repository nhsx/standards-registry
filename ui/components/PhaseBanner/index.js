import classnames from 'classnames';
import styles from './style.module.scss';

export default function PhaseBanner({ homepage }) {
  return (
    <div className={classnames('nhsuk-phase-banner', styles.phaseBanner, { [styles.homepage]: homepage })}>
      <div className={classnames('nhsuk-width-container', styles.inner, { [styles.homepage]: homepage })}>
        <span className="nhsuk-u-font-size-14">
          <strong className={classnames('nhsuk-tag', styles.tag, { [styles.homepage]: homepage })}> ALPHA </strong>
          <span className="nhsuk-phase-banner__text">
            This is a new service. It is a work in progress and some parts do not work yet.
          </span>
        </span>
      </div>
    </div>
  )
}
