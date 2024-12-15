import { Home, Dashboard, Login } from '../../views';

export const HOME_ROUTE = '/home';
export const DASHBOARD_ROUTE = '/dashboard';
export const LOGIN_ROUTE = '/login';

export const HOME_LABEL = 'Home';
export const DASHBOARD_LABEL = 'Dashboard';
export const LOGIN_LABEL = 'Login';

export const APP_ROUTES = [
  {
    path: LOGIN_ROUTE,
    component: Login,
    label: LOGIN_LABEL,
    id: '0',
  },
  {
    path: HOME_ROUTE,
    component: Home,
    label: HOME_LABEL,
    id: '1',
  },
  {
    path: DASHBOARD_ROUTE,
    component: Dashboard,
    label: DASHBOARD_LABEL,
    id: '2',
  },
];
