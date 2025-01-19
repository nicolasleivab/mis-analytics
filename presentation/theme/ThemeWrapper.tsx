import useTheme from './useTheme';

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return <div data-theme={theme}>{children}</div>;
};
