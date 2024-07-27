import { BodyViz } from "../../components";
import { Card, Flex } from "../../layout";
import * as styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <Flex direction="column">
        <h2>Dashboard</h2>
        <Flex justifyContent="flex-start">
          <Card>
            <BodyViz />
          </Card>
          <div></div>
        </Flex>
      </Flex>
    </div>
  );
}
