import classnames from 'classnames';

const typeMap = {
  'Technical specifications and APIs': 'nhsuk-tag--blue',
  'Data governance and information': 'nhsuk-tag--grey',
  'Clinical and care record standards': 'nhsuk-tag--orange',
  'Medical data and dictionaries': 'nhsuk-tag--green',
};

export default function TypeTag({ children, classes, type }) {
  return (
    <span
      className={classnames('nhsuk-tag', classes, typeMap[type] || null)}
    >
      {children}
    </span>
  );
}
