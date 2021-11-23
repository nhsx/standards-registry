import classnames from 'classnames';

export default function Button({ secondary, className, children }) {
  return (
    <button
      className={classnames('nhsuk-button', className, {
        'nhsuk-button--secondary': secondary,
      })}
    >
      {children}
    </button>
  );
}
