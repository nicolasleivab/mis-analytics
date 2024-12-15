import AppRouter from './controller/Router/AppRouter';
import { createTheme } from '@mantine/core';

const theme = createTheme({
  /** Mantine theme override */
});

export default function App() {
  return <AppRouter theme={theme} />;
}
