// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { useState, useEffect } from 'react';
import { Select, Flex, Box } from '@mantine/core';
import { useExcelContext } from '../../../../application/context/Excel/ExcelProvider';
import { BarChart } from '@mantine/charts';
import { BODY_PARTS_MAPPING } from '../../../../application/hooks/Home/useImportFields';

export default function ModelComparison() {
  const { excelData } = useExcelContext();
  const [model1, setModel1] = useState<string | null>(null);
  const [model2, setModel2] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (model1 && model2 && excelData.length > 0) {
      const data1 = excelData.find((dataSet) => dataSet.name === model1)?.data;
      const data2 = excelData.find((dataSet) => dataSet.name === model2)?.data;

      if (data1 && data2) {
        const comparisonData = Object.keys(BODY_PARTS_MAPPING).map((part) => ({
          part: BODY_PARTS_MAPPING[part], // Map the key to human-readable part names
          [model1]: parseFloat(data1[0][part]) || 0,
          [model2]: parseFloat(data2[0][part]) || 0,
        }));

        setChartData(comparisonData);
      }
    }
  }, [model1, model2, excelData]);
  console.log(chartData, model1, model2, [
    { name: model1, color: '#4A90E2' }, // Use hexadecimal colors
    { name: model2, color: '#50E3C2' },
  ]);
  return (
    <Flex direction="column" gap="lg" padding="20px" align={'center'}>
      <Box>
        <Select
          label="Select Model 1"
          placeholder="Pick a model"
          data={excelData.map((dataset) => ({
            value: dataset.name,
            label: dataset.name,
          }))}
          value={model1}
          onChange={setModel1}
        />
      </Box>

      <Box>
        <Select
          label="Select Model 2"
          placeholder="Pick a model"
          data={excelData.map((dataset) => ({
            value: dataset.name,
            label: dataset.name,
          }))}
          value={model2}
          onChange={setModel2}
        />
      </Box>

      {chartData.length > 0 ? (
        <Box style={{ width: '80%' }}>
          <BarChart
            h={300}
            data={chartData}
            dataKey="part" // 'part' is the key representing body parts (x-axis)
            series={[
              { name: model1, color: '#4A90E2' }, // Use hexadecimal colors
              { name: model2, color: '#50E3C2' },
            ]}
            tickLine="y"
          />
        </Box>
      ) : (
        <p>Please select two models to compare</p>
      )}
    </Flex>
  );
}
