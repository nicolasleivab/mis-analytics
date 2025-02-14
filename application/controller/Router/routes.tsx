import { Home, Dashboard, ModelComparison, Login, Register } from '../../views';

export const HOME_ROUTE = '/';
export const DASHBOARD_ROUTE = '/analytics';
export const MODEL_COMPARISON_ROUTE = '/model-comparison';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';

export const HOME_LABEL = 'Home';
export const DASHBOARD_LABEL = 'Analytics';
export const LOGIN_LABEL = 'Login';
export const REGISTER_LABEL = 'Register';
export const MODEL_COMPARISON_LABEL = 'Model Comparison';

export type TRoute = {
  path: string;
  component: () => JSX.Element;
  label: string;
  id: string;
  isProtected: boolean;
};

export const APP_ROUTES: TRoute[] = [
  // TODO: add back when auth service is implemented
  {
    path: LOGIN_ROUTE,
    component: Login,
    label: LOGIN_LABEL,
    id: '0',
    isProtected: false,
  },
  {
    path: HOME_ROUTE,
    component: Home,
    label: HOME_LABEL,
    id: '1',
    isProtected: true,
  },
  {
    path: DASHBOARD_ROUTE,
    component: Dashboard,
    label: DASHBOARD_LABEL,
    id: '2',
    isProtected: true,
  },
  {
    path: MODEL_COMPARISON_ROUTE,
    component: ModelComparison,
    label: MODEL_COMPARISON_LABEL,
    id: '3',
    isProtected: true,
  },
  {
    path: REGISTER_ROUTE,
    component: Register,
    label: REGISTER_LABEL,
    id: '4',
    isProtected: false,
  },
];
