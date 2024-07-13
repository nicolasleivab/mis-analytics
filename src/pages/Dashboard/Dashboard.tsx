import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeProvider";
import * as styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles[`Dashboard-${theme}`]}>
      <h2>Dashboard</h2>
    </div>
  );
}
