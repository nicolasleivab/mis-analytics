import React from 'react';
import { Table } from '@mantine/core';
import { TPolymorphicRecord } from '../../../model/Project/definitions';
import { useIntlContext } from '../../intl/IntlContext';
import { DATE_FIELDS } from '../../../model/definitions/ImportFields';

// Renderer for body cells
type CustomCellRenderer = (
  cellValue: unknown,
  row: TPolymorphicRecord
) => React.ReactNode;

// Renderer for header cells (e.g., custom label, icons, etc.)
export type CustomHeaderRenderer = (
  header: string,
  index: number
) => React.ReactNode;

type DynamicTableProps = {
  headers: string[];
  data: TPolymorphicRecord[];
  caption?: string;
  // Maps a column name -> function to render its cell
  customRenderers?: Record<string, CustomCellRenderer>;
  // Maps a column name -> function to render its header
  customHeaderRenderers?: Record<string, CustomHeaderRenderer>;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  headers,
  data,
  caption,
  customRenderers = {},
  customHeaderRenderers = {},
}) => {
  const { intl } = useIntlContext();

  const rows = data.map((row, rowIndex) => (
    <Table.Tr key={rowIndex}>
      {headers.map((header, cellIndex) => {
        const cellValue = row[header];
        const isCellValueADate = DATE_FIELDS.includes(header);

        // Format as date if needed
        const parsedCellValue = isCellValueADate
          ? intl.formatDate(cellValue as string)
          : cellValue;

        // If there's a custom renderer for this header, use it
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
            {headers.map((header, index) => {
              const content = customHeaderRenderers[header]
                ? customHeaderRenderers[header](header, index)
                : intl.formatMessage(header.toString() ?? '');

              return <Table.Th key={index}>{content}</Table.Th>;
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default DynamicTable;
