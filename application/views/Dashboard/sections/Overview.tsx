import { useEffect, useState } from 'react';
import { SvgViz } from '../../../../presentation/components';
import { Card } from '../../../../presentation/layout';
import { getTableStats } from '../../../../model/data-handlers';
import StatsTable from '../../../../presentation/components/StatsTable/StatsTable';
import { RangeSlider, Flex, Box, Select } from '@mantine/core';
import { useSvgPartSelection } from '../../../../model/hooks';
import { TStats } from '../../../../model/definitions/Stats';
import { DEFAULT_ALL_FIELD } from '../../../../model/definitions/ImportFields';
import {
  selectAllSheets,
  selectAllVariableFields,
  selectIdField,
  selectUniqueSvgParts,
  useAppSelector,
} from '../../../../model';
import {
  TExcelSheet,
  TExcelSheetData,
  // TFilter,
  TPolymorphicRecord,
} from '../../../../model/Excel/definitions';
import { TDropdownOption } from '../../../../model/definitions/Tabs';
import { TGetMappedData } from '../../../../model/data-handlers/getTableStats';

export default function Overview() {
  const [selectedSheet, setSelectedSheet] = useState<string>('0');
  const [currentDataset, setCurrentDataset] = useState<TExcelSheetData>([]);
  const [currentExcelSheet, setCurrentExcelSheet] = useState<TExcelSheet>();
  const [availableSheets, setAvailableSheets] = useState<TDropdownOption[]>([]);
  const { svgPartSelection, handleSvgPartSelection } = useSvgPartSelection();
  // const [filters, setFilters] = useState<TFilter[]>([]);

  const excelData = useAppSelector(selectAllSheets);
  const variableFields = useAppSelector(selectAllVariableFields);
  const idField = useAppSelector(selectIdField);
  const svgParts = useAppSelector(selectUniqueSvgParts);
  const [filteredData, setFilteredData] =
    useState<TExcelSheetData>(currentDataset);

  console.log('excelData', excelData);

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

  // HERE define filters in useEffect from excelData.filters which is of type export type TVariableType = 'id' | 'numeric' | 'category';
  useEffect(() => {
    if (currentDataset?.length === 0) return;
    console.log('currentDataset', currentDataset);
    setFilteredData(currentDataset);
  }, [currentDataset]);

  // Apply svg part selection filter
  useEffect(() => {
    console.log('filteredData', filteredData);
    let filtered = filteredData.length > 0 ? filteredData : currentDataset;

    if (svgPartSelection.length > 0) {
      filtered = filtered.map((item) => {
        const filteredItem = { ...item };
        const lowerCaseKeys = Object.keys(filteredItem).map((key) =>
          key.toLowerCase()
        );
        const lowerCaseSvgPartSelection = svgPartSelection.map((key) =>
          key.toLowerCase()
        );

        lowerCaseKeys.forEach((key) => {
          if (lowerCaseSvgPartSelection.includes(key)) {
            const typedKey = key as keyof typeof findPatient;
            const findPatient = currentDataset.find((patient) => {
              const typedPatient = patient as unknown as TPolymorphicRecord;
              typedPatient[idField] === typedPatient[idField];
            });

            filteredItem[typedKey] = findPatient?.[typedKey] as
              | string
              | number
              | boolean
              | null
              | undefined;
            return;
          }
          if (!lowerCaseSvgPartSelection.includes(key)) {
            return;
          }
          const typedFileteredItem =
            filteredItem as unknown as TPolymorphicRecord;
          typedFileteredItem[key] = 0;
        });
        return filteredItem;
      });
    }

    setFilteredData(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgPartSelection, currentDataset, idField]);

  const data: TGetMappedData = {
    parsedData: filteredData,
    variableFields,
    svgPartSelection,
    svgParts,
  };
  const stats: TStats[] = getTableStats(data);

  return (
    <Flex gap="md">
      <Flex direction="column" align="center" style={{ flex: 1 }}>
        <Flex direction="column">
          {currentExcelSheet?.filters &&
          currentExcelSheet.filters.length > 0 ? (
            <h2>Filters</h2>
          ) : null}
          <Flex gap="40px" wrap="wrap">
            {currentExcelSheet?.filters.map((filter) => (
              <Box key={filter.name}>
                {filter.type === 'numeric' ? (
                  <div style={{ width: '300px' }}>
                    <label>{filter.name}</label>
                    <Flex align="center">
                      <Box mr="10px">{filter.range?.[0]}</Box>
                      <RangeSlider
                        label={filter.name}
                        min={filter.range?.[0]}
                        max={filter.range?.[1]}
                        step={filter.range ? filter.range?.[1] / 100 : 1}
                        defaultValue={[filter.range![0], filter.range![1]]}
                        onChangeEnd={(value) => console.log(value)}
                        style={{ width: '100%' }}
                      />
                      <Box ml="10px">{filter.range?.[1]}</Box>
                    </Flex>
                  </div>
                ) : (
                  <Select
                    data={filter.values}
                    defaultValue={filter.values![0]}
                    label={filter.name}
                    placeholder="Select option"
                    onChange={(value) => console.log(value)}
                  />
                )}
              </Box>
            ))}
          </Flex>
        </Flex>

        <Flex direction="column">
          <SvgViz
            selected={svgPartSelection}
            onPartClick={(part) => handleSvgPartSelection(part)}
            stats={stats}
          />
        </Flex>
      </Flex>
      <Flex
        direction="column"
        style={{ flex: 1.5 }}
        justify="flex-start"
        align="center"
      >
        {availableSheets.length > 0 ? (
          <Select
            allowDeselect={false}
            defaultValue={availableSheets[0]?.value}
            label="Select dataset"
            placeholder="Select dataset"
            onChange={(val) => setSelectedSheet(val!)}
            data={availableSheets}
          />
        ) : null}
        {stats?.length > 0 ? (
          <Flex direction="column" gap="20px">
            <span>{`Number of rows: ${filteredData.length}`}</span>
            <StatsTable stats={stats} />
          </Flex>
        ) : (
          <Card>
            <p>No data available</p>
          </Card>
        )}
      </Flex>
    </Flex>
  );
}
