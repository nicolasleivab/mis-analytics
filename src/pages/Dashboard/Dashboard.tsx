import { useState } from "react";
import { BodyViz } from "../../components";
import { Card, Flex } from "../../layout";
import * as styles from "./Dashboard.module.css";
import { BODY_PARTS } from "../../components/BodyViz/body-parts";

export default function Dashboard() {
  const [selected, setSelected] = useState(BODY_PARTS[0].name);

  return (
    <div className={styles.Dashboard}>
      <Flex direction="column">
        <h2>Dashboard</h2>
        <Flex justifyContent="flex-start">
          <Card>
            <BodyViz
              selected={selected}
              onPartClick={(part) => setSelected(part)}
            />
          </Card>
          <div></div>
        </Flex>
      </Flex>
    </div>
  );
}
