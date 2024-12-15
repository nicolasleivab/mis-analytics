import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { APP_ROUTES } from './routes';
import Nav from '../Nav/Nav';
import React from 'react';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  // TODO: Implement authentication for private routes
  // If the user is not authorized, you could redirect here.
  return <>{children}</>;
}

// Now this is just a function that returns the rendered JSX.
// Note: It's no longer a React component by strict definition;
// it's a helper function returning React elements.
export function createAppRouter() {
  return (
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
  );
}
