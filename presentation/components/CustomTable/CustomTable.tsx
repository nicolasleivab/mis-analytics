import React from 'react';
import { Table } from '@mantine/core';
import { TPolymorphicRecord } from '../../../model/Project/definitions';
import { useIntlContext } from '../../intl/IntlContext';
import { DATE_FIELDS } from '../../../model/definitions/ImportFields';

type CustomCellRenderer = (
  cellValue: unknown,
  row: TPolymorphicRecord
) => React.ReactNode;

type DynamicTableProps = {
  headers: string[];
  data: TPolymorphicRecord[];
  caption?: string;
  customRenderers?: Record<string, CustomCellRenderer>;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  headers,
  data,
  caption,
  customRenderers = {},
}) => {
  const { intl } = useIntlContext();

  const rows = data.map((row, rowIndex) => (
    <Table.Tr key={rowIndex}>
      {headers.map((header, cellIndex) => {
        const cellValue = row[header];
        const isCellValueADate = DATE_FIELDS.includes(header);

        const parsedCellValue = isCellValueADate
          ? intl.formatDate(cellValue as string)
          : cellValue;

        const content = customRenderers[header]
          ? customRenderers[header](cellValue, row)
          : parsedCellValue;

        return <Table.Td key={cellIndex}>{content}</Table.Td>;
      })}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth="100%">
      <Table>
        {caption && <Table.Caption>{caption}</Table.Caption>}
        <Table.Thead>
          <Table.Tr>
            {headers.map((header, index) => (
              <Table.Th key={index}>
                {intl.formatMessage(header?.toString() ?? '')}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default DynamicTable;
