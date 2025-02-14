import React from 'react';
import { Table } from '@mantine/core';
import { TPolymorphicRecord } from '../../../model/Project/definitions';

type DynamicTableProps = {
  headers: string[];
  data: TPolymorphicRecord[];
  caption?: string;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  headers,
  data,
  caption,
}) => {
  const rows = data.map((row, rowIndex) => (
    <Table.Tr key={rowIndex}>
      {headers.map((header, cellIndex) => (
        <Table.Td key={cellIndex}>{row[header]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth="100%">
      <Table>
        {caption && <Table.Caption>{caption}</Table.Caption>}
        <Table.Thead>
          <Table.Tr>
            {headers.map((header, index) => (
              <Table.Th key={index}>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default DynamicTable;
