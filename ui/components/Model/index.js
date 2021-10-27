import get from 'lodash/get';
import { Component, Table, Tbody, Tr, Td } from '../';

export default function Model({ schema, data }) {
  return (
    <div className="nhsuk-model">
      <p>{data.notes}</p>
      <Table>
        <Tbody>
          {
            Object.keys(schema).filter(key => schema[key].show !== false).map((key, index) => {
              const options = schema[key];
              const val = options.accessor ? get(data, options.accessor, data[key]) : data[key];
              return (
                <Tr key={index}>
                  <Td>{options.label}</Td>
                  <Td className="nhsuk-table__cell">{ options.format ? options.format(val, data) : val }</Td>
                </Tr>
              )
            })
          }
        </Tbody>
      </Table>
    </div>
  )
}
