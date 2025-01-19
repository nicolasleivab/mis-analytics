import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export type TTheme = 'light' | 'dark' | 'auto';

export type TThemeContext = {
  theme: TTheme;
  toggleTheme: () => void;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<TTheme>(
    (localStorage?.getItem('theme') as TTheme) || 'light'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
