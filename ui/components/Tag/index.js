import classnames from 'classnames';

const typeMap = {
  'technical standards and specifications': 'nhsuk-tag--blue',
  'information codes of practice': 'nhsuk-tag--red',
  'record standard': 'nhsuk-tag--orange',
  'data definitions and terminologies': 'nhsuk-tag--green',
};

export default function TypeTag({ children, classes, type }) {
  return (
    <span
      className={classnames(
        'nhsuk-tag',
        classes,
        typeMap[type.toLowerCase()] || null
      )}
    >
      {children}
    </span>
  );
}
