import get from 'lodash/get';
import { Table, Tbody, Tr, Td } from '../';

const format = ({ options, vals, data }) =>
  options.format ? options.format(vals, data) : vals;

const Rows = (props) => {
  const { options, vals, data } = props;
  return (
    <Td className="nhsuk-table__cell">
      {Array.isArray(vals) ? (
        <ul className="nhsuk-list-bullet">
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

export default function Model({ schema, data }) {
  return (
    <div className="nhsuk-model">
      <p>{data.notes}</p>
      <Table>
        <Tbody>
          {Object.keys(schema)
            .filter((key) => schema[key].show !== false)
            .map((key, index) => {
              const options = schema[key];
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
    </div>
  );
}
