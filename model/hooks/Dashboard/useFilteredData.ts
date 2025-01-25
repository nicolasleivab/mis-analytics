import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { selectAllSheets } from '../../Excel/excelSelectors';
import {
  TExcelSheet,
  TExcelSheetData,
  TNumericRange,
  TPolymorphicRecord,
  TVariableType,
} from '../../Excel/definitions';
import { TDropdownOption } from '../../definitions/Tabs';
import { DEFAULT_ALL_FIELD } from '../../definitions/ImportFields';

export type TFilterStateItem = {
  name: string;
  type: TVariableType;
  value?: string | null;
  range?: TNumericRange;
};

export default function useFilteredData() {
  const [selectedSheet, setSelectedSheet] = useState<string>('0');
  const [currentDataset, setCurrentDataset] = useState<TExcelSheetData>([]);
  const [filterState, setFilterState] = useState<TFilterStateItem[]>([]);
  const [currentExcelSheet, setCurrentExcelSheet] = useState<TExcelSheet>();
  const [availableSheets, setAvailableSheets] = useState<TDropdownOption[]>([]);
  const [filteredData, setFilteredData] =
    useState<TExcelSheetData>(currentDataset);

  const excelData = useAppSelector(selectAllSheets);

  useEffect(() => {
    if (!excelData?.length) return;

    if (selectedSheet === DEFAULT_ALL_FIELD.value) {
      const mergedDataSets = excelData.map((sheet) => sheet.data).flat();
      setCurrentDataset(mergedDataSets);
    } else {
      const currentDataset = excelData[Number(selectedSheet)]?.data;
      setCurrentDataset(currentDataset);
      setCurrentExcelSheet(excelData[Number(selectedSheet)]);
    }
  }, [selectedSheet, excelData]);

  useEffect(() => {
    if (currentDataset?.length === 0) return;

    const mappedSheets = excelData.map((sheet, index) => ({
      value: index.toString(),
      label: sheet.name,
    }));
    setAvailableSheets([...mappedSheets, DEFAULT_ALL_FIELD]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDataset]);

  useEffect(() => {
    if (currentDataset?.length === 0) return;

    let filtered = currentDataset;

    if (filterState?.length > 0) {
      filterState.forEach((filter) => {
        if (filter.type === 'numeric') {
          filtered = filtered.filter((item) => {
            const typedItem = item as unknown as TPolymorphicRecord;
            const value = typedItem[filter.name] as number;
            return value >= filter.range![0] && value <= filter.range![1];
          });
        } else {
          filtered = filtered.filter((item) => {
            if (filter.value === DEFAULT_ALL_FIELD.value) return true;
            const typedItem = item as unknown as TPolymorphicRecord;
            const value = typedItem[filter.name] as string;
            return value === filter.value;
          });
        }
      });
    }

    setFilteredData(filtered);
  }, [filterState, currentDataset]);

  const onRangeSliderChange = (
    value: TNumericRange,
    filter: TFilterStateItem
  ) => {
    setFilterState((prevState) => {
      // Find if we already have a filter with `filter.name`
      const idx = prevState.findIndex((f) => f.name === filter.name);

      if (idx >= 0) {
        // Update the existing filter
        return prevState.map((item, i) =>
          i === idx ? { ...item, range: value as TNumericRange } : item
        );
      } else {
        // Create a new filter entry
        return [
          ...prevState,
          {
            name: filter.name,
            type: filter.type,
            range: value as TNumericRange, // The new range
          },
        ];
      }
    });
  };

  const onSelectValueChange = (value: string, filter: TFilterStateItem) => {
    setFilterState((prevState) => {
      // Check if there's already a filter item for `filter.name`
      const idx = prevState.findIndex((f) => f.name === filter.name);

      // If found, update it
      if (idx >= 0) {
        return prevState.map((item, i) => {
          if (i === idx) {
            return { ...item, value };
          }
          return item;
        });
      }

      // Otherwise, create a new one
      return [
        ...prevState,
        {
          name: filter.name,
          type: filter.type,
          value: value,
        },
      ];
    });
  };

  return {
    filteredData,
    currentExcelSheet,
    filterState,
    onRangeSliderChange,
    onSelectValueChange,
    availableSheets,
    setSelectedSheet,
    currentDataset,
  };
}
