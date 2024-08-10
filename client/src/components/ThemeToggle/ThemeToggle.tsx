import React from 'react';
import useTheme from '../../hooks/useTheme';
import * as styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.btnToggle}
      aria-pressed={theme === 'dark'}
      onClick={toggleTheme}
    >
      <div className={styles.handle}></div>
    </button>
  );
};

export default ThemeToggle;
