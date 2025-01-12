import { createAppRouter } from './controller/Router/AppRouter';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../model/store';
import { MantineProvider, createTheme } from '@mantine/core';
import { ChakraProvider } from '@chakra-ui/react';
import { TabsProvider, ThemeProvider, ThemeWrapper } from '../model/context';

const theme = createTheme({
  // Mantine theme overrides
});

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <MantineProvider theme={theme}>
          <ChakraProvider>
            <ThemeWrapper>
              <TabsProvider>{createAppRouter()}</TabsProvider>
            </ThemeWrapper>
          </ChakraProvider>
        </MantineProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
