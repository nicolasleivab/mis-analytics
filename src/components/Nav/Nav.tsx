import { Flex } from "../../layout";
import * as styles from "./Nav.module.css";
import { Logo } from "../../assets/icons";
// import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Nav() {
  return (
    <div className={styles.Nav}>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex padding="20px" justifyContent="flex-start" alignItems="center">
          <Logo />
          <h2 className={styles.title}>MIS Analytics</h2>
        </Flex>
        {/* <ThemeToggle /> */}
      </Flex>
    </div>
  );
}
