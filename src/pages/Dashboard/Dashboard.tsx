import { useState } from "react";
import { BodyViz } from "../../components";
import { Card, Flex } from "../../layout";
import * as styles from "./Dashboard.module.css";
import { BODY_PARTS } from "../../components/BodyViz/body-parts";
import { useExcelContext } from "../../context/Excel/ExcelProvider";

export default function Dashboard() {
  const [selected, setSelected] = useState(BODY_PARTS[0].name);
  const { excelData } = useExcelContext();

  return (
    <div className={styles.Dashboard}>
      <Flex direction="column" width="100%">
        <h2>Dashboard</h2>
        <Flex>
          <Card>
            <BodyViz
              selected={selected}
              onPartClick={(part) => setSelected(part)}
            />
          </Card>
          <Flex direction="column">{JSON.stringify(excelData)}</Flex>
        </Flex>
      </Flex>
    </div>
  );
}
