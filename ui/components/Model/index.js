import get from 'lodash/get';
import classnames from 'classnames';
import styles from './style.module.scss';

const format = ({ options, vals, data }) =>
  options.format ? options.format(vals, data) : vals;

const Rows = (props) => {
  const { options, vals, data } = props;
  return (
    <dd className={styles.breakWord}>
      {Array.isArray(vals) && vals.length > 0 ? (
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

const Section = ({ entry, data }) => {
  return (
    <>
      <h2 className={classnames(styles.sectionTitle, 'nhsuk-heading-m')}>
        {entry.section_title}
      </h2>
      {Object.keys(entry)
        .filter((key) => entry[key].label)
        .map((key, index) => {
          const options = entry[key];
          const val = options.accessor
            ? get(data, options.accessor, data[key])
            : data[key];
          return (
            <dl key={index} className={classnames(styles.grid)}>
              <dt>
                <span className="nhsuk-u-font-weight-bold">
                  {options.label}
                </span>
              </dt>
              <Rows vals={val} options={options} data={data}></Rows>
            </dl>
          );
        })}
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
