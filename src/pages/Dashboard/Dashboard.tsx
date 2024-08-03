import { useEffect, useState } from "react";
import { BodyViz, Dropdown } from "../../components";
import { Card, Flex } from "../../layout";
import * as styles from "./Dashboard.module.css";
import { BODY_PARTS } from "../../components/BodyViz/body-parts";
import { useExcelContext } from "../../context/Excel/ExcelProvider";
import { getTableStats } from "../../data-handlers";
import { Stats, TGetMappedData } from "../../data-handlers/get-table-stats";
import StatsTable from "../../components/StatsTable/StatsTable";

export default function Dashboard() {
  const [selected, setSelected] = useState(BODY_PARTS[0].name);
  const [sexFilter, setSexFilter] = useState<string>('All');
  const [heightRange, setHeightRange] = useState<[number, number]>([0, 500]);
  const { excelData } = useExcelContext();
  const [filteredData, setFilteredData] = useState(excelData);
 

  const headers = [
    'name', 'id', 'sex', 'height', 'head score', 'thorax score', 'abdomen score', 'lower-abdomen and pelvis score'
  ];
  const mapping = {
    'head score': 'Head',
    'thorax score': 'Thorax',
    'abdomen score': 'Abdomen',
    'lower-abdomen and pelvis score': 'Lower-abdomen and Pelvis'
  };



  // useEffect(() => {
  //   console.log('Parsed Data:', parsedData);
  // }, [parsedData]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    let filtered: any[] = excelData;

    if (sexFilter !== 'All') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      filtered = filtered.filter(item => item.sex === sexFilter);
    }

    filtered = filtered.filter(item => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const height = parseFloat(item.height);
      return height >= heightRange[0] && height <= heightRange[1];
    });

    setFilteredData(filtered);
  }, [sexFilter, heightRange, excelData]);

  const data: TGetMappedData = { parsedData: filteredData, headers, mapping };

  const stats: Stats[] = getTableStats(data);

  useEffect(() => {
    console.log('Stats:', stats);
  }, [stats]);
console.log(stats)

  return (
    <div className={styles.Dashboard}>
      <Flex direction="column" width="100%">
        <Flex>
          <Flex direction="column" padding="0px 0 50px 0">
          <h2>Filters</h2>
          <div style={{width: '300px'}}>
        <Dropdown
          label={"Filter by sex"}
          options={[{id: 'All', label: 'All'}, {id: 'M', label: 'Male'}, {label: 'Female', id: 'F'}]}
          id={sexFilter}
          onChange={setSexFilter}
          placeholder="Select sex"
        />
     </div>
     </Flex>
        </Flex>
        <Flex padding="0 50px 0 50px">

            <BodyViz
              selected={selected}
              onPartClick={(part) => setSelected(part)}
            />

          {stats?.length > 0 ? (
          <Flex direction="column"> <StatsTable stats={stats} /></Flex>
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
