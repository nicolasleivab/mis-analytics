import { useContext } from "react";
import { Flex } from "../../layout";
import { TTheme, ThemeContext } from "../../context/Theme/ThemeProvider";
import * as styles from "./Nav.module.css";

export default function Nav() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles[`Nav-${theme}`]}>
      <Flex padding="20px">
        <button
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme}
        </button>
      </Flex>
    </div>
  );
}
