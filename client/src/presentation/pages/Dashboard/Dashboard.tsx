// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
import { useEffect, useState } from 'react';
import { BodyViz } from '../../components';
import { Card } from '../../layout';
import * as styles from './Dashboard.module.css';
import { useExcelContext } from '../../../application/context/Excel/ExcelProvider';
import { getTableStats } from '../../../application/data-handlers';
import {
  Stats,
  TGetMappedData,
} from '../../../application/data-handlers/get-table-stats';
import StatsTable from '../../components/StatsTable/StatsTable';
import { RangeSlider, Flex, Box, Select } from '@mantine/core';
import useBodyPartSelection from '../../../application/hooks/useBodyPartSelection';
import {
  EXTRA_FIELDS,
  HEADERS,
} from '../../../application/hooks/useImportFields';

const DEFAULT_GENDER_VALUES = [
  { value: 'All', label: 'All' },
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];

export default function Dashboard() {
  const [selectedSheet, setSelectedSheet] = useState<string>('0');
  const [availableSheets, setAvailableSheets] = useState<any[]>([]);
  const { bodyPartSelection, handleBodyPartSelection } = useBodyPartSelection();
  const [sexFilter, setSexFilter] = useState<string>('All');
  const [heightRange, setHeightRange] = useState<[number, number]>([0, 500]);
  const [minMaxRanges, setMinMaxRanges] = useState<[number, number] | null>(
    null
  );
  const { excelData } = useExcelContext();
  const [filteredData, setFilteredData] = useState(excelData);

  const mapping: Record<string, string> = {
    'head score': 'Head',
    'thorax score': 'Thorax',
    'abdomen score': 'Abdomen',
    'lower-abdomen and pelvis score': 'Lower-abdomen and Pelvis',
  };

  useEffect(() => {
    if (!excelData?.length) return;

    const mappedSheets = excelData.map((sheet, index) => ({
      value: index.toString(),
      label: sheet.name,
    }));
    setAvailableSheets(mappedSheets);

    const currentDataset = excelData[Number(selectedSheet)]?.data;
    const currentHeightRange = currentDataset?.map((item: any) =>
      parseFloat(item.height)
    );
    setMinMaxRanges([
      Math.min(...currentHeightRange),
      Math.max(...currentHeightRange),
    ]);
    setHeightRange([
      Math.min(...currentHeightRange),
      Math.max(...currentHeightRange),
    ]);
  }, [excelData, selectedSheet]);

  // Apply sex and height filters
  useEffect(() => {
    if (!excelData?.length) return;
    let filtered = excelData[Number(selectedSheet)]?.data;

    if (sexFilter !== 'All') {
      filtered = filtered.filter((item) => item.sex === sexFilter);
    }

    filtered = filtered.filter((item) => {
      const height = parseFloat(item.height);
      return height >= heightRange[0] && height <= heightRange[1];
    });

    setFilteredData(filtered);
  }, [sexFilter, heightRange, excelData, selectedSheet]);

  // Apply body part selection filter
  useEffect(() => {
    let filtered = filteredData;

    if (bodyPartSelection.length > 0) {
      const selectedBodyParts = bodyPartSelection.map(
        (part) => `${part} score`
      );

      filtered = filtered.map((item) => {
        const filteredItem = { ...item };
        Object.keys(filteredItem).forEach((key) => {
          if (selectedBodyParts.includes(key)) {
            const currentDataset = excelData[Number(selectedSheet)]?.data;
            const findPatient = currentDataset.find(
              (patient) => patient.id === item.id
            );

            filteredItem[key] = findPatient[key];
            return;
          }
          if (EXTRA_FIELDS.map((item) => item.name).includes(key)) {
            return;
          }
          filteredItem[key] = 0;
        });
        return filteredItem;
      });
    }

    setFilteredData(filtered);
  }, [bodyPartSelection]);

  const data: TGetMappedData = {
    parsedData: filteredData,
    headers: HEADERS,
    mapping,
    selectedBodyParts: bodyPartSelection,
  };
  const stats: Stats[] = getTableStats(data);

  return (
    <div className={styles.Dashboard}>
      <Flex height="100%" gap="md">
        <Flex direction="column" align="center" style={{ flex: 1 }}>
          <Flex direction="column" padding="20px">
            <h2>Filters</h2>
            <Flex gap="40px">
              <div style={{ width: '300px' }}>
                <Select
                  allowDeselect={false}
                  defaultValue={DEFAULT_GENDER_VALUES[0].value}
                  label="Filter by sex"
                  placeholder="Select sex"
                  onChange={setSexFilter}
                  data={DEFAULT_GENDER_VALUES}
                />
              </div>
              <div style={{ width: '300px' }}>
                <label>Height Range</label>
                <Flex align="center" width="100%">
                  <Box mr="10px">{heightRange[0]}</Box>
                  {minMaxRanges ? (
                    <RangeSlider
                      min={minMaxRanges[0]}
                      max={minMaxRanges[1]}
                      step={1}
                      defaultValue={minMaxRanges}
                      onChangeEnd={(val) => setHeightRange([val[0], val[1]])}
                      style={{ width: '100%' }}
                    />
                  ) : null}
                  <Box ml="10px">{heightRange[1]}</Box>
                </Flex>
              </div>
            </Flex>
          </Flex>

          <Flex direction="column" padding="20px">
            <BodyViz
              selected={bodyPartSelection}
              onPartClick={(part) => handleBodyPartSelection(part)}
              stats={stats}
            />
          </Flex>
        </Flex>
        <Flex
          direction="column"
          padding="20px"
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
              onChange={setSelectedSheet}
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
    </div>
  );
}
