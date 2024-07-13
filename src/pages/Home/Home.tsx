import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeProvider";
import * as styles from "./Home.module.css";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles[`Home-${theme}`]}>
      {" "}
      <h2>Home</h2>
    </div>
  );
}
