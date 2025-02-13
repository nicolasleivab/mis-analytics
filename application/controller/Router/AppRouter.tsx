import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { APP_ROUTES, LOGIN_ROUTE } from './routes';
import Nav from '../Nav/Nav';
import { verifyUser } from '../../../model/User/userThunks';
import { selectUser, useAppDispatch, useAppSelector } from '../../../model';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Attempt to verify if we don't have user in state
      dispatch(verifyUser())
        .unwrap()
        .catch(() => {
          navigate(LOGIN_ROUTE);
        });
    }
  }, [dispatch, navigate, user]);

  if (isLoading && !user) {
    return <div>Loading...</div>;
  }

  return children;
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
                <ProtectedRoute>
                  <route.component />
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}
