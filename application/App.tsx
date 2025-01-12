import { createAppRouter } from './controller/Router/AppRouter';
import { MantineProvider, createTheme } from '@mantine/core';
import { ChakraProvider } from '@chakra-ui/react';
import { TabsProvider, ThemeProvider, ThemeWrapper } from '../model/context';

const theme = createTheme({
  // Mantine theme overrides
});

export default function App() {
  return (
    <ThemeProvider>
      <MantineProvider theme={theme}>
        <ChakraProvider>
          <ThemeWrapper>
            <TabsProvider>{createAppRouter()}</TabsProvider>
          </ThemeWrapper>
        </ChakraProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}
