import { MultiSelect, Select, Flex, Box } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import { darkColorPalette1 } from '../../../../presentation/styles/colors';
import { useModelComparison } from '../../../../model/hooks';
import { TStat } from '../../../../model/definitions/Stats';
import { selectAllSheets, useAppSelector } from '../../../../model';

export default function ModelComparison() {
  const excelData = useAppSelector(selectAllSheets);
  const {
    selectedModels,
    setSelectedModels,
    chartData,
    selectedStat,
    setSelectedStat,
  } = useModelComparison();

  return (
    <Flex direction="column" gap="lg" align="center">
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
          onChange={(id) => {
            const statId = id as TStat;
            setSelectedStat(statId);
          }}
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
