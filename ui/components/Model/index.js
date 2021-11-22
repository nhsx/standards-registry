import { isArray } from "lodash";
import get from "lodash/get";
import { Component, Table, Tbody, Tr, Td } from "../";
import styles from "./style.module.scss";

const Rows = (props) => {
  const { options, vals, data } = props;
  let values;
  values = !isArray(vals) ? [vals] : vals;
  return (
    <Td className="nhsuk-table__cell">
      {isArray(vals)
        ? values.map((val, index) => (
            <Table key={index}>
              <Tbody>
                <Tr>
                  <Td classes={styles.td}>
                    {options.format ? options.format(val, data) : val}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          ))
        : options.format
        ? options.format(vals, data)
        : vals}
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
