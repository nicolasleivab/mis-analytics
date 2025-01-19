import { createContext } from 'react';
import { TThemeContext } from './ThemeProvider';

export const ThemeContext = createContext<TThemeContext>({
  theme: 'light',
  toggleTheme: () => console.log('toggleTheme'),
});
