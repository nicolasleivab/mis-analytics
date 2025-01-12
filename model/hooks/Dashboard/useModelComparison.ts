import { useEffect, useState } from 'react';
import { BODY_PARTS_MAPPING } from '../../definitions/ImportFields';
import { TStat } from '../../definitions/Stats';
import { useAppSelector } from '../../store';
import { selectAllSheets } from '../../Excel/excelSelectors';
// import { TExcelSheet } from '../../Excel/definitions';

type ChartEntry = {
  part: string;
  [modelName: string]: number | string;
};

export default function useModelComparison() {
  const excelData = useAppSelector(selectAllSheets);

  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [selectedStat, setSelectedStat] = useState<TStat>('Mean');

  useEffect(() => {
    if (selectedModels.length > 0 && excelData.length > 0) {
      // Map selected models to their corresponding datasets
      const datasets = selectedModels.map((modelName) => {
        const dataSet = excelData.find((dataSet) => dataSet.name === modelName);
        return dataSet?.data;
      });

      if (datasets.every((data) => !!data)) {
        const comparisonData = Object.keys(BODY_PARTS_MAPPING).map(
          (partKey) => {
            const partName = BODY_PARTS_MAPPING[partKey] || partKey;
            const entry: ChartEntry = { part: partName };

            selectedModels.forEach((modelName, index) => {
              const dataset = datasets[index];
              // Map rows to numeric values for the current body part
              const values = (
                dataset as unknown as Record<string, unknown>[]
              ).map((row) => parseFloat(row[partKey] as string) || 0);

              let calculatedValue: number;

              if (values.length === 0) {
                calculatedValue = 0;
              } else {
                switch (selectedStat) {
                  case 'Mean':
                    calculatedValue =
                      values.reduce((a, b) => a + b, 0) / values.length;
                    break;
                  case 'Median':
                    // eslint-disable-next-line no-case-declarations
                    const sorted = values.slice().sort((a, b) => a - b);
                    // eslint-disable-next-line no-case-declarations
                    const mid = Math.floor(sorted.length / 2);
                    calculatedValue =
                      sorted.length % 2 === 0
                        ? (sorted[mid - 1] + sorted[mid]) / 2
                        : sorted[mid];
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
              }

              // Round the calculated value to 4 decimal places
              entry[modelName] = parseFloat(calculatedValue.toFixed(4));
            });
            return entry;
          }
        );

        setChartData(comparisonData);
      }
    }
  }, [selectedModels, excelData, selectedStat]);

  return {
    selectedModels,
    setSelectedModels,
    chartData,
    selectedStat,
    setSelectedStat,
  };
}
