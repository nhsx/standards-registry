import classnames from 'classnames';

export default function Card({ children, clickable, className }) {
  return (
    <div
      className={classnames(
        'nhsuk-card',
        { 'nhsuk-card--clickable': clickable },
        className
      )}
    >
      <div className="nhsuk-card__content">{children}</div>
    </div>
  );
}
