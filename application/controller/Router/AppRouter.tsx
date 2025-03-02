import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  APP_ROUTES,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SVG_EDITOR_ROUTE,
} from './routes';
import Nav from '../Nav/Nav';
import { verifyUser } from '../../../model/User/userThunks';
import {
  selectAllSheets,
  selectAllSvgParts,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '../../../model';
import { useEffect } from 'react';
import { CustomAlert, NotFoundPage } from '../../../presentation/components';

type ProtectedRouteProps = {
  children: JSX.Element;
  isProtected: boolean;
};

export function ProtectedRoute({ children, isProtected }: ProtectedRouteProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const excelData = useAppSelector(selectAllSheets);
  const svgParts = useAppSelector(selectAllSvgParts);

  const navigate = useNavigate();
  const shouldVerifyUser = !user && isProtected;
  const shouldRedirectToHome =
    ((user && excelData.length === 0) ?? (user && svgParts.length === 0)) &&
    location.pathname !== SVG_EDITOR_ROUTE;

  useEffect(() => {
    // Verify user and redirect to login if not logged in
    if (shouldVerifyUser) {
      dispatch(verifyUser())
        .unwrap()
        .catch(() => {
          navigate(LOGIN_ROUTE);
        });
    }
    // Redirect to home if user is logged in and there is no data
    if (shouldRedirectToHome) {
      navigate(HOME_ROUTE);
    }
  }, [dispatch, navigate, shouldVerifyUser, shouldRedirectToHome]);

  return children;
}

// Now this is just a function that returns the rendered JSX.
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
