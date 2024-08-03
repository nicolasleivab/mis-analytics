import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

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
  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Medical Image Segmentation Dice Scores</TableCaption>
        <Thead>
          <Tr>
            <Th>Body Part</Th>
            <Th isNumeric>Mean</Th>
            <Th isNumeric>Median</Th>
            <Th isNumeric>Standard Deviation</Th>
            <Th isNumeric>Minimum</Th>
            <Th isNumeric>Maximum</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats.map((stat, index) => (
            <Tr key={index}>
              <Td>{stat.bodyPart}</Td>
              <Td isNumeric>{stat.mean.toFixed(4)}</Td>
              <Td isNumeric>{stat.median.toFixed(4)}</Td>
              <Td isNumeric>{stat.stdDev.toFixed(4)}</Td>
              <Td isNumeric>{stat.min.toFixed(4)}</Td>
              <Td isNumeric>{stat.max.toFixed(4)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
