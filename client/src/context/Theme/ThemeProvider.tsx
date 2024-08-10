import React, { useEffect, useState } from 'react';

export type TTheme = 'light' | 'dark';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => console.log('toggleTheme'),
});

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
