// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { useEffect, useState } from 'react';
import { BodyViz } from '../../components';
import { Card, Flex } from '../../layout';
import * as styles from './Dashboard.module.css';
import { useExcelContext } from '../../../application/context/Excel/ExcelProvider';
import { getTableStats } from '../../../application/data-handlers';
import {
  Stats,
  TGetMappedData,
} from '../../../application/data-handlers/get-table-stats';
import StatsTable from '../../components/StatsTable/StatsTable';
import { RangeSlider } from '@mantine/core';
import useBodyPartSelection from '../../../application/hooks/useBodyPartSelection';
import { Select, Box } from '@mantine/core';
import { EXTRA_FIELDS } from '../../../application/hooks/useImportFields';

export default function Dashboard() {
  const { bodyPartSelection, handleBodyPartSelection } = useBodyPartSelection();
  const [sexFilter, setSexFilter] = useState<string>('All');
  const [heightRange, setHeightRange] = useState<[number, number]>([0, 500]);
  const [minMaxRanges, setMinMaxRanges] = useState<[number, number] | null>(
    null
  );
  const { excelData } = useExcelContext();
  const [filteredData, setFilteredData] = useState(excelData);

  const headers = [
    'name',
    'id',
    'sex',
    'height',
    'head score',
    'thorax score',
    'abdomen score',
    'lower-abdomen and pelvis score',
  ];
  const mapping: Record<string, string> = {
    'head score': 'Head',
    'thorax score': 'Thorax',
    'abdomen score': 'Abdomen',
    'lower-abdomen and pelvis score': 'Lower-abdomen and Pelvis',
  };

  // Update height range based on excel data
  useEffect(() => {
    if (!excelData?.length) return;
    const currentHeightRange = excelData.map((item: any) =>
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
  }, [excelData]);

  // Apply sex and height filters
  useEffect(() => {
    let filtered = excelData;

    if (sexFilter !== 'All') {
      filtered = filtered.filter((item) => item.sex === sexFilter);
    }

    filtered = filtered.filter((item) => {
      const height = parseFloat(item.height);
      return height >= heightRange[0] && height <= heightRange[1];
    });

    setFilteredData(filtered);
  }, [sexFilter, heightRange, excelData]);

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
            const findPatient = excelData.find(
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
    headers,
    mapping,
    selectedBodyParts: bodyPartSelection,
  };
  const stats: Stats[] = getTableStats(data);
  console.log(minMaxRanges);
  return (
    <div className={styles.Dashboard}>
      <Flex>
        <Flex direction="column" width="40%">
          <Flex direction="column" padding="20px">
            <h2>Filters</h2>
            <Flex gap="40px">
              <div style={{ width: '300px' }}>
                <Select
                  allowDeselect={false}
                  label="Filter by sex"
                  placeholder="Select sex"
                  onChange={setSexFilter}
                  data={[
                    { value: 'All', label: 'All' },
                    { value: 'M', label: 'Male' },
                    { value: 'F', label: 'Female' },
                  ]}
                />
              </div>
              <div style={{ width: '300px' }}>
                <label>Height Range</label>
                <Flex alignItems="center" width="100%">
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
        <Flex direction="column" padding="20px" width="60%">
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
