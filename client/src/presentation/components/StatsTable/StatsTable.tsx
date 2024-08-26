import React from 'react';
import { Table } from '@mantine/core';

interface Stats {
  bodyPart: string;
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
}

interface StatsTableProps {
  stats: Stats[];
}

const StatsTable: React.FC<StatsTableProps> = ({ stats }) => {
  const rows = stats.map((stat, index) => (
    <Table.Tr key={index}>
      <Table.Td>{stat.bodyPart}</Table.Td>
      <Table.Td>{stat.mean.toFixed(4)}</Table.Td>
      <Table.Td>{stat.median.toFixed(4)}</Table.Td>
      <Table.Td>{stat.stdDev.toFixed(4)}</Table.Td>
      <Table.Td>{stat.min.toFixed(4)}</Table.Td>
      <Table.Td>{stat.max.toFixed(4)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table>
        <Table.Caption>Medical Image Segmentation Dice Scores</Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Body Part</Table.Th>
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
