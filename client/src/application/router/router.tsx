import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from '../../presentation/components';
import { DASHBOARD_ROUTE, HOME_ROUTE } from './routes';
import Home from '../../presentation/pages/Home/Home';
import Dashboard from '../../presentation/pages/Dashboard/Dashboard';
import { ThemeProvider } from '../context/Theme/ThemeProvider';
import { ThemeWrapper } from '../context/Theme/ThemeWrapper';
import { ExcelProvider } from '../context/Excel/ExcelProvider';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const AppRouter = () => (
  <ThemeProvider>
    <ExcelProvider>
      <MantineProvider theme={theme}>
        <ThemeWrapper>
          <Router>
            <Nav />
            <Routes>
              <Route path={HOME_ROUTE} element={<Home />} />
              <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Router>
        </ThemeWrapper>
      </MantineProvider>
    </ExcelProvider>
  </ThemeProvider>
);

export default AppRouter;
