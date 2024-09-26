// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { useState, useEffect } from 'react';
import { MultiSelect, Select, Flex, Box } from '@mantine/core';
import { useExcelContext } from '../../../../application/context/Excel/ExcelProvider';
import { BarChart } from '@mantine/charts';
import {
  BODY_PARTS_MAPPING,
  EXTRA_STATS,
} from '../../../../application/hooks/Home/useImportFields';
import { darkColorPalette1 } from '../../../styles/colors';

export default function ModelComparison() {
  const { excelData } = useExcelContext();
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [statsChartData, setStatsChartData] = useState<any[]>([]);
  const [selectedStat, setSelectedStat] = useState<string>('Mean'); // Add state for stat selection

  useEffect(() => {
    if (selectedModels.length > 0 && excelData.length > 0) {
      const datasets = selectedModels.map(
        (modelName) =>
          excelData.find((dataSet) => dataSet.name === modelName)?.data
      );

      if (datasets.every((data) => data)) {
        const comparisonData = Object.keys(BODY_PARTS_MAPPING).map((part) => {
          const entry = { part: BODY_PARTS_MAPPING[part] || part };

          selectedModels.forEach((modelName, index) => {
            const dataset = datasets[index];
            const values = dataset.map((row) => parseFloat(row[part]) || 0);

            let calculatedValue;
            switch (selectedStat) {
              case 'Mean':
                calculatedValue =
                  values.reduce((a, b) => a + b, 0) / values.length;
                break;
              case 'Median':
                const sorted = values.slice().sort((a, b) => a - b);
                calculatedValue =
                  sorted.length % 2 === 0
                    ? (sorted[sorted.length / 2 - 1] +
                        sorted[sorted.length / 2]) /
                      2
                    : sorted[Math.floor(sorted.length / 2)];
                break;
              case 'Min':
                calculatedValue = Math.min(...values);
                break;
              case 'Max':
                calculatedValue = Math.max(...values);
                break;
              default:
                calculatedValue =
                  values.reduce((a, b) => a + b, 0) / values.length;
            }

            // Round the calculated value to 4 decimal places
            entry[modelName] = parseFloat(calculatedValue.toFixed(4));
          });
          return entry;
        });

        setChartData(comparisonData);
      }
    }
  }, [selectedModels, excelData, selectedStat]);

  return (
    <Flex direction="column" gap="lg" padding="20px" align="center">
      <Box style={{ width: '80%' }}>
        <MultiSelect
          label="Select Models"
          placeholder="Pick one or more models"
          data={excelData.map((dataset) => ({
            value: dataset.name,
            label: dataset.name,
          }))}
          value={selectedModels}
          onChange={setSelectedModels}
          clearable
        />
      </Box>

      <Box style={{ width: '80%' }}>
        <Select
          allowDeselect={false}
          label="Select Statistic"
          placeholder="Pick a statistic"
          data={['Mean', 'Median', 'Min', 'Max']}
          value={selectedStat}
          onChange={setSelectedStat}
        />
      </Box>

      {selectedModels.length > 0 ? (
        <Box style={{ width: '80%', marginTop: '100px' }}>
          <BarChart
            h={300}
            data={chartData}
            dataKey="part" // 'part' is the key representing body parts (x-axis)
            series={selectedModels.map((model, index) => ({
              name: model,
              color: darkColorPalette1[index] ?? darkColorPalette1[0],
              dataKey: model,
            }))}
            tickLine="y"
          />
        </Box>
      ) : (
        <p>
          Please select at least one model to visualize the chart. Keep
          selecting/removing models to update the chart on the fly.
        </p>
      )}
    </Flex>
  );
}
