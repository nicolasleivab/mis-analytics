import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme/ThemeContext';
import { useMantineColorScheme } from '@mantine/core';

function useTheme() {
  const context = useContext(ThemeContext);
  const { setColorScheme } = useMantineColorScheme();
  const { theme } = context;
  setColorScheme(theme);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default useTheme;
