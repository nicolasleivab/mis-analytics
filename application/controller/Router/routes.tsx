import { Home, Dashboard, Login } from '../../views';
import ModelComparison from '../../views/Dashboard/sections/ModelComparison';

export const HOME_ROUTE = '/home';
export const DASHBOARD_ROUTE = '/analytics';
export const MODEL_COMPARISON_ROUTE = '/model-comparison';
export const LOGIN_ROUTE = '/';

export const HOME_LABEL = 'Home';
export const DASHBOARD_LABEL = 'Analytics';
export const LOGIN_LABEL = 'Login';
export const MODEL_COMPARISON_LABEL = 'Model Comparison';

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
  {
    path: MODEL_COMPARISON_ROUTE,
    component: ModelComparison,
    label: MODEL_COMPARISON_LABEL,
    id: '3',
  },
];
