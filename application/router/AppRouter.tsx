import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from '../../presentation/components';
import { DASHBOARD_ROUTE, HOME_ROUTE } from './routes';
import { Home, Dashboard } from '../pages';
import { createTheme, MantineProvider } from '@mantine/core';
import { ChakraProvider } from '@chakra-ui/react';
import {
  TabsProvider,
  ThemeProvider,
  ExcelProvider,
  ThemeWrapper,
} from '../../model/context';

const theme = createTheme({
  /** Mantine theme override */
});

const AppRouter = () => (
  <ThemeProvider>
    <ExcelProvider>
      <MantineProvider theme={theme}>
        <ChakraProvider>
          <ThemeWrapper>
            <TabsProvider>
              <Router>
                <Nav />
                <Routes>
                  <Route path="*" element={<Home />} />
                  <Route path={HOME_ROUTE} element={<Home />} />
                  <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
                </Routes>
              </Router>
            </TabsProvider>
          </ThemeWrapper>
        </ChakraProvider>
      </MantineProvider>
    </ExcelProvider>
  </ThemeProvider>
);

export default AppRouter;
