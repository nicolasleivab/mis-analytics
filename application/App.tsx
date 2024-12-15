import { createAppRouter } from './controller/Router/AppRouter';
import { MantineProvider, createTheme } from '@mantine/core';
import { ChakraProvider } from '@chakra-ui/react';
import {
  TabsProvider,
  ThemeProvider,
  ExcelProvider,
  ThemeWrapper,
} from '../model/context';

const theme = createTheme({
  // Mantine theme overrides
});

export default function App() {
  return (
    <ThemeProvider>
      <MantineProvider theme={theme}>
        <ChakraProvider>
          <ThemeWrapper>
            <TabsProvider>
              <ExcelProvider>{createAppRouter()}</ExcelProvider>
            </TabsProvider>
          </ThemeWrapper>
        </ChakraProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}
