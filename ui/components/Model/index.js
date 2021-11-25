import get from 'lodash/get';
import { Table, Tbody, Tr, Td } from '../';

const format = ({ options, vals, data }) =>
  options.format ? options.format(vals, data) : vals;

const Rows = (props) => {
  const { options, vals, data } = props;
  return (
    <Td className="nhsuk-table__cell">
      {Array.isArray(vals) ? (
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
    </Td>
  );
};

const Section = ({ entry, data }) => {
  console.log('entry', entry);
  return (
    <>
      <h2 className="nhsuk-heading-m">{entry.section_title}</h2>
      <Table>
        <Tbody>
          {Object.keys(entry)
            .filter((key) => entry[key].label)
            .map((key, index) => {
              console.log(key);
              const options = entry[key];
              const val = options.accessor
                ? get(data, options.accessor, data[key])
                : data[key];
              return (
                <Tr key={index}>
                  <Td>
                    <span className="nhsuk-u-font-weight-bold">
                      {options.label}
                    </span>
                  </Td>
                  <Rows vals={val} options={options} data={data}></Rows>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
};

export default function Model({ schema, data }) {
  console.log(data, schema);
  return (
    <div className="nhsuk-model">
      {schema.map((entry, index) => {
        console.log('here', entry);
        return <Section key={index} entry={entry} data={data}></Section>;
      })}
    </div>
  );
}
