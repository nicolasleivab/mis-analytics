import React from 'react';
import { Table } from '@mantine/core';
import { TStats } from '../../../model/definitions/Stats';

type StatsTableProps = {
  stats: TStats[];
};

const StatsTable: React.FC<StatsTableProps> = ({ stats }) => {
  const rows = stats.map((stat, index) => (
    <Table.Tr key={index} bg={stat.isHighlighted ? '#3399ff50' : 'transparent'}>
      <Table.Td>{stat.svgPart}</Table.Td>
      <Table.Td>{stat.mean.toFixed(4)}</Table.Td>
      <Table.Td>{stat.median.toFixed(4)}</Table.Td>
      <Table.Td>{stat.stdDev.toFixed(4)}</Table.Td>
      <Table.Td>{stat.min.toFixed(4)}</Table.Td>
      <Table.Td>{stat.max.toFixed(4)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={'100%'}>
      <Table>
        <Table.Caption>Aggregated Data Table</Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Svg Part/Indicator</Table.Th>
            <Table.Th>Mean</Table.Th>
            <Table.Th>Median</Table.Th>
            <Table.Th>Standard Deviation</Table.Th>
            <Table.Th>Minimum</Table.Th>
            <Table.Th>Maximum</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default StatsTable;
