import get from 'lodash/get';
import classnames from 'classnames';
import styles from './style.module.scss';

const format = ({ options, vals, data }) =>
  options.format ? options.format(vals, data) : vals;

const Rows = (props) => {
  const { options, vals, data } = props;
  return (
    <dd className={styles.breakWord}>
      {Array.isArray(vals) && vals.length > 1 ? (
        <ul className="nhsuk-list-bullet nhsuk-u-font-size-16">
          {vals.map((val, index) => (
            <li key={index}>
              {options.format ? options.format(val, data) : val}
            </li>
          ))}
        </ul>
      ) : (
        format(props)
      )}
      {options.more}
    </dd>
  );
};

const itDisplaysLabel = (key, entry, data) => {
  const options = entry[key];
  const hasData = options.accessor
    ? get(data, options.accessor, data[key])
    : data[key];

  if (hasData && hasData.length > 0) {
    return true;
  }

  return !entry[key].hide_when_empty;
};

const Section = ({ entry, data }) => {
  const generateContent = (entry, data) => {
    const returnValue = Object.keys(entry)
      .filter((key) => entry[key].label)
      .filter((key) => itDisplaysLabel(key, entry, data))
      .map((key, index) => {
        const options = entry[key];
        const val = options.accessor
          ? get(data, options.accessor, data[key])
          : data[key];
        return (
          <dl key={index} className={classnames(styles.grid)}>
            <dt>
              <span className="nhsuk-u-font-weight-bold">{options.label}</span>
            </dt>
            <Rows vals={val} options={options} data={data}></Rows>
          </dl>
        );
      });
    return returnValue;
  };

  const content = generateContent(entry, data);

  return (
    <>
      {content.length > 0 ? (
        <h2 className={classnames(styles.sectionTitle, 'nhsuk-heading-m')}>
          {entry.section_title}
        </h2>
      ) : null}
      {content}
    </>
  );
};

export default function list({ schema, data }) {
  return (
    <>
      {schema.map((entry, index) => {
        return <Section key={index} entry={entry} data={data}></Section>;
      })}
    </>
  );
}
