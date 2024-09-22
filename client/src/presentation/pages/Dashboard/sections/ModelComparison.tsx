// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { useState, useEffect } from 'react';
import { MultiSelect, Flex, Box } from '@mantine/core';
import { useExcelContext } from '../../../../application/context/Excel/ExcelProvider';
import { BarChart } from '@mantine/charts';
import { BODY_PARTS_MAPPING } from '../../../../application/hooks/Home/useImportFields';
import { darkColorPalette1 } from '../../../styles/colors';

export default function ModelComparison() {
  const { excelData } = useExcelContext();
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (selectedModels.length > 0 && excelData.length > 0) {
      const datasets = selectedModels.map(
        (modelName) =>
          excelData.find((dataSet) => dataSet.name === modelName)?.data
      );

      if (datasets.every((data) => data)) {
        const comparisonData = Object.keys(BODY_PARTS_MAPPING).map((part) => {
          const entry = { part: BODY_PARTS_MAPPING[part] };
          selectedModels.forEach((modelName, index) => {
            const dataset = datasets[index];
            entry[modelName] = parseFloat(dataset[0][part]) || 0;
          });
          return entry;
        });

        setChartData(comparisonData);
      }
    }
  }, [selectedModels, excelData]);

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
