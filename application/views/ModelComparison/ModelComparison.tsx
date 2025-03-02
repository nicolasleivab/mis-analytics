import { MultiSelect, Select, Flex, Box, Text } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import {
  lightColorPalette1,
  darkColorPalette1,
} from '../../../presentation/styles/colors';
import { useModelComparison } from '../../../model/hooks';
import { TStatLabel } from '../../../model/definitions/Stats';
import { selectAllSheets, TExcelSheet, useAppSelector } from '../../../model';
import * as styles from './ModelComparison.module.css';
import { CustomCard, CustomTable } from '../../../presentation/components';
// import { CustomHeaderRenderer } from '../../../presentation/components/CustomTable/CustomTable';

export default function ModelComparison() {
  const excelData = useAppSelector(selectAllSheets);
  const {
    selectedModels,
    setSelectedModels,
    chartData,
    selectedStat,
    setSelectedStat,
    setSelectedFields,
    selectedFields,
    numericFields,
  } = useModelComparison();

  if (excelData?.length === 0) {
    return (
      <div className={styles.ModelComparison}>
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Text>No data, please import a sheet first.</Text>
        </Flex>
      </div>
    );
  }
  const customHeaderRenderers: Record<string, (header: string) => JSX.Element> =
    {};

  selectedModels.forEach((model, index) => {
    customHeaderRenderers[model] = (header: string) => {
      return (
        <Flex align={'center'} gap={'10px'}>
          <div
            className={styles.circle}
            style={{
              backgroundColor:
                darkColorPalette1[index] ??
                lightColorPalette1[index - darkColorPalette1.length] ??
                darkColorPalette1[0],
            }}
          ></div>
          <Text>{header}</Text>
        </Flex>
      );
    };
  });

  return (
    <div className={styles.ModelComparison}>
      <Flex direction="column" gap="lg" align="center">
        <Box style={{ width: '80%' }}>
          <MultiSelect
            label="Select Models"
            placeholder="Pick one or more models"
            data={excelData.map((dataset: TExcelSheet) => ({
              value: dataset.name,
              label: dataset.name,
            }))}
            value={selectedModels}
            onChange={setSelectedModels}
            clearable
          />
        </Box>

        <Box style={{ width: '80%' }}>
          <MultiSelect
            label="Select Fields/Variables to Compare"
            placeholder="Pick one or more models"
            data={numericFields.map((field) => ({
              value: field,
              label: field,
            }))}
            value={selectedFields}
            onChange={setSelectedFields}
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
              const statId = id as TStatLabel;
              setSelectedStat(statId);
            }}
          />
        </Box>

        {selectedModels.length > 0 ? (
          <>
            <Box style={{ width: '80%', marginTop: '100px' }}>
              <BarChart
                h={300}
                data={chartData}
                dataKey="part" // 'part' is the key representing body parts (x-axis)
                series={selectedModels.map((model, index) => ({
                  name: model,
                  color:
                    darkColorPalette1[index] ??
                    lightColorPalette1[index - darkColorPalette1.length] ??
                    darkColorPalette1[0],
                  dataKey: model,
                }))}
                tickLine="y"
              />
            </Box>
            <Box style={{ width: '90%', marginTop: '50px' }}>
              <CustomCard width="100%">
                <CustomTable
                  headers={['part', ...selectedModels]}
                  data={chartData}
                  customHeaderRenderers={customHeaderRenderers}
                  caption={'Models Comparison'}
                />
              </CustomCard>
            </Box>
          </>
        ) : (
          <p>Please select at least one model to visualize the charts.</p>
        )}
      </Flex>
    </div>
  );
}
