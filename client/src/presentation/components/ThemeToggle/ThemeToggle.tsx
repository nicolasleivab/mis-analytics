import React from 'react';
import useTheme from '../../../application/hooks/useTheme';
import * as styles from './ThemeToggle.module.css';
import { ActionIcon, Group } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Group justify="center">
      <ActionIcon
        onClick={toggleTheme}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
        className={styles.btnToggle}
      >
        {theme === 'dark' ? (
          <IconSun stroke={1.5} color="white" />
        ) : (
          <IconMoon stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
};

export default ThemeToggle;
