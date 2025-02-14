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
import { CustomAlert } from '../../../presentation/components';

type ProtectedRouteProps = {
  children: JSX.Element;
  isProtected: boolean;
};

export function ProtectedRoute({ children, isProtected }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isProtected) {
      dispatch(verifyUser())
        .unwrap()
        .catch(() => {
          navigate(LOGIN_ROUTE);
        });
    }
  }, [dispatch, navigate, user, isProtected]);

  // if (isLoading && !user) {
  //   return <div>Loading...</div>;
  // }

  return children;
}

// Now this is just a function that returns the rendered JSX.
// Note: It's no longer a React component by strict definition;
// it's a helper function returning React elements.
export function createAppRouter() {
  return (
    <Router>
      <div>
        <CustomAlert />
        <Nav />
        <Routes>
          {APP_ROUTES.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                <ProtectedRoute isProtected={route.isProtected}>
                  <route.component />
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}
