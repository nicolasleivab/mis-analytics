import { useEffect, useState } from 'react';
import { TStatLabel } from '../../definitions/Stats';
import { useAppSelector } from '../../store';
import {
  selectAllSheets,
  selectAllVariableFields,
  selectUniqueSvgParts,
} from '../../Project/projectSelectors';
import { TExcelSheet } from '../../Project/definitions';

type ChartEntry = {
  part: string;
  [modelName: string]: number | string;
};

export default function useModelComparison() {
  const excelData = useAppSelector(selectAllSheets);
  const svgUniqueParts = useAppSelector(selectUniqueSvgParts);
  const variableFields = useAppSelector(selectAllVariableFields);

  const [selectedModels, setSelectedModels] = useState<string[]>(
    excelData.map((dataset: TExcelSheet) => dataset.name)
  );
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [selectedStat, setSelectedStat] = useState<TStatLabel>('Mean');

  const numericFields = variableFields
    .filter((field) => field.type === 'numeric')
    .map((field) => field.name);

  const [selectedFields, setSelectedFields] = useState<string[]>(
    numericFields.filter((field) => svgUniqueParts.includes(field))
  );

  useEffect(() => {
    if (selectedModels.length > 0 && excelData.length > 0) {
      const datasets = selectedModels.map((modelName) => {
        const dataSet = excelData.find(
          (d: TExcelSheet) => d.name === modelName
        );
        return dataSet?.data;
      });

      if (datasets.every((data) => !!data)) {
        const comparisonData = selectedFields.map((partKey) => {
          const partName = partKey;
          const entry: ChartEntry = { part: partName };

          selectedModels.forEach((modelName, index) => {
            const dataset = datasets[index];
            const values = (
              dataset as unknown as Record<string, unknown>[]
            ).map((row) => parseFloat(row[partName] as string) || 0);

            let calculatedValue: number;

            if (values.length === 0) {
              calculatedValue = 0;
            } else {
              switch (selectedStat) {
                case 'Mean':
                  calculatedValue =
                    values.reduce((a, b) => a + b, 0) / values.length;
                  break;
                case 'Median': {
                  const sorted = values.slice().sort((a, b) => a - b);
                  const mid = Math.floor(sorted.length / 2);
                  calculatedValue =
                    sorted.length % 2 === 0
                      ? (sorted[mid - 1] + sorted[mid]) / 2
                      : sorted[mid];
                  break;
                }
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
            entry[modelName] = parseFloat(calculatedValue.toFixed(4));
          });

          return entry;
        });

        setChartData(comparisonData);
      }
    }
  }, [
    selectedModels,
    excelData,
    selectedStat,
    svgUniqueParts,
    selectedFields,
    numericFields,
  ]);

  return {
    selectedModels,
    setSelectedModels,
    chartData,
    selectedStat,
    setSelectedStat,
    selectedFields,
    setSelectedFields,
    numericFields,
  };
}
