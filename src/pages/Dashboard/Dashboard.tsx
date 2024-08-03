import { useState } from "react";
import { BodyViz } from "../../components";
import { Card, Flex } from "../../layout";
import * as styles from "./Dashboard.module.css";
import { BODY_PARTS } from "../../components/BodyViz/body-parts";
import { useExcelContext } from "../../context/Excel/ExcelProvider";
import { getTableStats } from "../../data-handlers";
import { Stats, TGetMappedData } from "../../data-handlers/get-table-stats";
import StatsTable from "../../components/StatsTable/StatsTable";

export default function Dashboard() {
  const [selected, setSelected] = useState(BODY_PARTS[0].name);
  const { excelData } = useExcelContext();
  // const parsedData = [
  //   {
  //       "name": "0dce41ce",
  //       "id": "AUTOMI_00000",
  //       "sex": "M",
  //       "height": "240",
  //       "head score": "0.8144",
  //       "thorax score": "0.7356",
  //       "abdomen score": "0.8447",
  //       "lower-abdomen and pelvis score": "0.8343"
  //   },
  //   {
  //       "name": "14b56322",
  //       "id": "AUTOMI_00001",
  //       "sex": "M",
  //       "height": "230",
  //       "head score": "0.8877",
  //       "thorax score": "0.8831",
  //       "abdomen score": "0.8844",
  //       "lower-abdomen and pelvis score": "0.8602"
  //   },
  //   // Add the rest of the parsed data here
  // ];

  const headers = [
    'name', 'id', 'sex', 'height', 'head score', 'thorax score', 'abdomen score', 'lower-abdomen and pelvis score'
  ];
  const mapping = {
    'head score': 'Head',
    'thorax score': 'Thorax',
    'abdomen score': 'Abdomen',
    'lower-abdomen and pelvis score': 'Lower-abdomen and Pelvis'
  };

  const data: TGetMappedData = { parsedData: excelData, headers, mapping };
  const stats: Stats[] = getTableStats(data);
console.log(stats)
  return (
    <div className={styles.Dashboard}>
      <Flex direction="column" width="100%">
        <h2>Dashboard</h2>
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
