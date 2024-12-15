import {
  Route,
  Routes,
  BrowserRouter as Router,
  // Navigate,
} from 'react-router-dom';
import { APP_ROUTES } from './routes';
import Nav from '../Nav/Nav';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ChakraProvider } from '@chakra-ui/react';
import {
  TabsProvider,
  ThemeProvider,
  ExcelProvider,
  ThemeWrapper,
} from '../../../model/context';

export default function AppRouter({ theme }: { theme: MantineThemeOverride }) {
  return (
    <ThemeProvider>
      <MantineProvider theme={theme}>
        <ChakraProvider>
          <ThemeWrapper>
            <TabsProvider>
              <ExcelProvider>
                <Router>
                  <div>
                    <Nav />
                    <Routes>
                      {APP_ROUTES.map((route) => (
                        <Route
                          key={route.id}
                          path={route.path}
                          element={
                            <PrivateRoute>
                              <route.component />
                            </PrivateRoute>
                          }
                        />
                      ))}
                    </Routes>
                  </div>
                </Router>
              </ExcelProvider>
            </TabsProvider>
          </ThemeWrapper>
        </ChakraProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}

function PrivateRoute({
  children,
  // id,
}: {
  children: React.ReactNode;
  // id: string;
}) {
  // TODO: Implement authentication for private routes
  // const { views } = useSelector(selectUser);

  // if (id === APP_ROUTES[0].id || views?.includes(id)) {
  //   return children;
  // }

  // return <Navigate to="/" />;

  return children;
}
