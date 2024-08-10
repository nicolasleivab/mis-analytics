import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from '../../presentation/components';
import { DASHBOARD_ROUTE, HOME_ROUTE } from './routes';
import Home from '../../presentation/pages/Home/Home';
import Dashboard from '../../presentation/pages/Dashboard/Dashboard';
import { ThemeProvider } from '../context/Theme/ThemeProvider';
import { ThemeWrapper } from '../context/Theme/ThemeWrapper';
import { ExcelProvider } from '../context/Excel/ExcelProvider';
import { ChakraProvider } from '@chakra-ui/react';

const AppRouter = () => (
  <ThemeProvider>
    <ExcelProvider>
      <ThemeWrapper>
        <ChakraProvider>
          <Router>
            <Nav />
            <Routes>
              <Route path={HOME_ROUTE} element={<Home />} />
              <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </ThemeWrapper>
    </ExcelProvider>
  </ThemeProvider>
);

export default AppRouter;
