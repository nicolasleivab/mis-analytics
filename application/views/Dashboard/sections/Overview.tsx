import { useState } from 'react';
import {
  CustomRangeSlider,
  CustomTable,
  SvgViz,
} from '../../../../presentation/components';
import { Card } from '../../../../presentation/layout';
import StatsTable from '../../../../presentation/components/StatsTable/StatsTable';
import { Flex, Box, Select, Text, Modal } from '@mantine/core';
import { TStats } from '../../../../model/definitions/Stats';
import {
  useFilteredData,
  useSvgPartSelection,
  selectAllVariableFields,
  selectUniqueSvgParts,
  useAppSelector,
  useStats,
} from '../../../../model';
import { TPolymorphicRecord } from '../../../../model/Excel/definitions';
import { MODAL_OFFSET } from '../../Home/Home';
import { CalendarIcon } from '@chakra-ui/icons';

export default function Overview() {
  const { svgPartSelection, handleSvgPartSelection } = useSvgPartSelection();

  const [openTableModal, setOpenTableModal] = useState<boolean>(false);
  // const [rangeStates, setRangeStates] = useState<TFilterStateItem[]>([]);

  const variableFields = useAppSelector(selectAllVariableFields);
  const svgParts = useAppSelector(selectUniqueSvgParts);

  const {
    filteredData,
    currentExcelSheet,
    filterState,
    onRangeSliderChange,
    onSelectValueChange,
    availableSheets,
    setSelectedSheet,
    currentDataset,
  } = useFilteredData();

  const stats: TStats[] = useStats({
    parsedData: filteredData,
    variableFields,
    svgPartSelection,
    svgParts,
  });

  const partsFromStats = stats.map((stat) => stat.svgPart);

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
                  <CustomRangeSlider
                    min={filter.range?.[0] ?? 0}
                    max={filter.range?.[1] ?? 0}
                    onChangeEnd={onRangeSliderChange}
                    filter={filter}
                  />
                ) : (
                  <Select
                    data={filter.values}
                    defaultValue={filter.values![0]}
                    label={filter.name}
                    placeholder="Select option"
                    onChange={(val) => onSelectValueChange(val!, filter)}
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
          headers={
            currentDataset[0]
              ? Object.keys(currentDataset[0]).filter((e) =>
                  partsFromStats.includes(e)
                )
              : []
          }
          data={filteredData as unknown as TPolymorphicRecord[]}
          caption={`Filtered data of sheet: ${currentExcelSheet?.name}`}
        />
      </Modal>
    </Flex>
  );
}
