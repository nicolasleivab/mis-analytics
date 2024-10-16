import { useEffect, useState } from 'react';
import { BODY_PARTS_MAPPING } from '../Home/useImportFields';
import { useExcelContext } from '../../context/Excel/ExcelProvider';

export default function useModelComparison() {
  const { excelData } = useExcelContext();
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedStat, setSelectedStat] = useState<string>('Mean');

  useEffect(() => {
    if (selectedModels.length > 0 && excelData.length > 0) {
      const datasets = selectedModels.map(
        (modelName: string) =>
          excelData.find((dataSet) => dataSet.name === modelName)?.data
      );

      if (datasets.every((data) => data)) {
        const comparisonData = Object.keys(BODY_PARTS_MAPPING).map((part: string) => {
          const entry: {[e:string]: any} = { part: BODY_PARTS_MAPPING[part] || part };

          selectedModels.forEach((modelName, index) => {
            const dataset = datasets[index];
            const values = dataset?.map((row: any) => parseFloat(row[part]) || 0);

            let calculatedValue;
            switch (selectedStat) {
              case 'Mean':
                calculatedValue =
                  values?.reduce((a, b) => a + b, 0)! / values?.length!;
                break;
              case 'Median':
                const sorted = values?.slice().sort((a, b) => a - b);
                calculatedValue =
                  sorted?.length! % 2 === 0
                    ? (sorted?.[sorted.length / 2 - 1]! +
                        sorted?.[sorted.length / 2]!) /
                      2
                    : sorted?.[Math.floor(sorted.length / 2)];
                break;
              case 'Min':
                calculatedValue = Math.min(...values || []);
                break;
              case 'Max':
                calculatedValue = Math.max(...values || []);
                break;
              default:
                calculatedValue =
                  values?.reduce((a, b) => a + b, 0)! / values?.length!;
            }


            entry[modelName] = parseFloat(calculatedValue?.toFixed(4)!);
          });
          return entry;
        });

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
