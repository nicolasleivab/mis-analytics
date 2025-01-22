import { useEffect, useState } from 'react';
import { CustomTable, SvgViz } from '../../../../presentation/components';
import { Card } from '../../../../presentation/layout';
import StatsTable from '../../../../presentation/components/StatsTable/StatsTable';
import { Flex, Box, Select, Text, Modal } from '@mantine/core';
import { useSvgPartSelection } from '../../../../model/hooks';
import { TStats } from '../../../../model/definitions/Stats';
import { DEFAULT_ALL_FIELD } from '../../../../model/definitions/ImportFields';
import {
  selectAllSheets,
  selectAllVariableFields,
  selectUniqueSvgParts,
  useAppSelector,
  useStats,
} from '../../../../model';
import {
  TExcelSheet,
  TExcelSheetData,
  TNumericRange,
  TPolymorphicRecord,
  TVariableType,
} from '../../../../model/Excel/definitions';
import { TDropdownOption } from '../../../../model/definitions/Tabs';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import { MODAL_OFFSET } from '../../Home/Home';
import { CalendarIcon } from '@chakra-ui/icons';

export type TFilterStateItem = {
  name: string;
  type: TVariableType;
  value?: string | null;
  range?: TNumericRange;
};

export default function Overview() {
  const [selectedSheet, setSelectedSheet] = useState<string>('0');
  const [currentDataset, setCurrentDataset] = useState<TExcelSheetData>([]);
  const [currentExcelSheet, setCurrentExcelSheet] = useState<TExcelSheet>();
  const [availableSheets, setAvailableSheets] = useState<TDropdownOption[]>([]);
  const { svgPartSelection, handleSvgPartSelection } = useSvgPartSelection();
  const [filterState, setFilterState] = useState<TFilterStateItem[]>([]);
  const [openTableModal, setOpenTableModal] = useState<boolean>(false);
  // const [rangeStates, setRangeStates] = useState<TFilterStateItem[]>([]);

  const excelData = useAppSelector(selectAllSheets);
  const variableFields = useAppSelector(selectAllVariableFields);
  const svgParts = useAppSelector(selectUniqueSvgParts);
  const [filteredData, setFilteredData] =
    useState<TExcelSheetData>(currentDataset);

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
  // Apply sex and height filters
  useEffect(() => {
    if (currentDataset?.length === 0) return;

    let filtered = currentDataset;
    // TODO add dynamic filters
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

  const stats: TStats[] = useStats({
    parsedData: filteredData,
    variableFields,
    svgPartSelection,
    svgParts,
  });

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
                      <Box mr="10px">
                        {filterState.find(
                          (stateFilter) => stateFilter.name === filter.name
                        )?.range?.[0] ?? filter.range?.[0]}
                      </Box>
                      <RangeSlider
                        min={filter.range?.[0]}
                        max={filter.range?.[1]}
                        step={getStepValue(filter.range!)}
                        defaultValue={[
                          filter.range?.[0] ?? 0,
                          filter.range?.[1] ?? 1,
                        ]}
                        // TODO: Add back with a debounce
                        // onChange={(value) => {
                        //   setRangeStates((prevState) => {
                        //     // Find if we already have a filter with `filter.name`
                        //     const idx = prevState.findIndex(
                        //       (f) => f.name === filter.name
                        //     );

                        //     if (idx >= 0) {
                        //       // Update the existing filter
                        //       return prevState.map((item, i) =>
                        //         i === idx
                        //           ? { ...item, range: value as TNumericRange }
                        //           : item
                        //       );
                        //     } else {
                        //       // Create a new filter entry
                        //       return [
                        //         ...prevState,
                        //         {
                        //           name: filter.name,
                        //           type: filter.type,
                        //           range: value as TNumericRange, // The new range
                        //         },
                        //       ];
                        //     }
                        //   });
                        // }}
                        onChangeEnd={(value) => {
                          setFilterState((prevState) => {
                            // Find if we already have a filter with `filter.name`
                            const idx = prevState.findIndex(
                              (f) => f.name === filter.name
                            );

                            if (idx >= 0) {
                              // Update the existing filter
                              return prevState.map((item, i) =>
                                i === idx
                                  ? { ...item, range: value as TNumericRange }
                                  : item
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
                        }}
                        style={{ width: '100%' }}
                      >
                        {' '}
                        <RangeSliderTrack bg="tomato">
                          <RangeSliderFilledTrack bg="#3399ff" />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} bg="#3399ff" />
                        <RangeSliderThumb index={1} bg="#3399ff" />
                      </RangeSlider>
                      <Box ml="10px">
                        {' '}
                        {filterState.find(
                          (stateFilter) => stateFilter.name === filter.name
                        )?.range?.[1] ?? filter.range?.[1]}
                      </Box>
                    </Flex>
                  </div>
                ) : (
                  <Select
                    data={filter.values}
                    defaultValue={filter.values![0]}
                    label={filter.name}
                    placeholder="Select option"
                    onChange={(value) => {
                      setFilterState((prevState) => {
                        // Check if there's already a filter item for `filter.name`
                        const idx = prevState.findIndex(
                          (f) => f.name === filter.name
                        );

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
                    }}
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
            <Flex
              align="center"
              gap="10px"
              onClick={() => setOpenTableModal(true)}
            >
              <Text
                fw={700}
                style={{ cursor: 'pointer' }}
              >{`Number of rows: ${filteredData.length}`}</Text>
              <CalendarIcon />
            </Flex>
            <StatsTable stats={stats} />
          </Flex>
        ) : (
          <Card>
            <p>No data available</p>
          </Card>
        )}
      </Flex>
      {/* Action Modal */}
      <Modal
        yOffset={MODAL_OFFSET}
        opened={openTableModal}
        onClose={() => setOpenTableModal(false)}
        title={`Filtered data of sheet: ${currentExcelSheet?.name}`}
        size="100%"
      >
        <Text fw={700}>
          {`Total rows after filters: ${filteredData.length}`}
        </Text>
        <Text>
          {`Data filtered by: ${
            filterState.length === 0
              ? 'no filters applied.'
              : filterState
                  .map((filter) => {
                    if (filter.type === 'numeric') {
                      return `${filter.name} between ${filter.range?.[0]} and ${filter.range?.[1]}`;
                    }
                    return `${filter.name} equals ${filter.value}`;
                  })
                  .join(', ')
          }`}
        </Text>
        <CustomTable
          headers={currentDataset[0] ? Object.keys(currentDataset[0]) : []}
          data={filteredData as unknown as TPolymorphicRecord[]}
          caption={`Filtered data of sheet: ${currentExcelSheet?.name}`}
        />
      </Modal>
    </Flex>
  );
}

function getStepValue(range: TNumericRange): number {
  if (range?.[1] > 100) return 1;
  if (range?.[1] > 10) return 0.1;
  if (range?.[1] > 1) return 0.001;
  return 0.0001;
}
