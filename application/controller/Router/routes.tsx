import {
  Home,
  Dashboard,
  ModelComparison,
  Login,
  Register,
  SVGEditor,
} from '../../views';
import {
  IconBrandDatabricks,
  IconBrandGoogleAnalytics,
  IconHome2,
  IconTableDashed,
} from '@tabler/icons-react';

export const HOME_ROUTE = '/';
export const DASHBOARD_ROUTE = '/analytics';
export const MODEL_COMPARISON_ROUTE = '/model-comparison';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const SVG_EDITOR_ROUTE = '/svg-editor';

export const HOME_LABEL = 'Home';
export const DASHBOARD_LABEL = 'Analytics';
export const LOGIN_LABEL = 'Login';
export const REGISTER_LABEL = 'Register';
export const MODEL_COMPARISON_LABEL = 'Model Comparison';
export const SVG_EDITOR_LABEL = 'SVG Editor';

export type TRoute = {
  path: string;
  component: () => JSX.Element;
  label: string;
  id: string;
  isProtected: boolean;
  icon?: JSX.Element;
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
    icon: <IconHome2 title="Home" />,
  },
  {
    path: DASHBOARD_ROUTE,
    component: Dashboard,
    label: DASHBOARD_LABEL,
    id: '2',
    isProtected: true,
    icon: <IconTableDashed title="Analytics" />,
  },
  {
    path: MODEL_COMPARISON_ROUTE,
    component: ModelComparison,
    label: MODEL_COMPARISON_LABEL,
    id: '3',
    isProtected: true,
    icon: <IconBrandGoogleAnalytics title="Model Comparison" />,
  },
  {
    path: REGISTER_ROUTE,
    component: Register,
    label: REGISTER_LABEL,
    id: '4',
    isProtected: false,
  },
  {
    path: SVG_EDITOR_ROUTE,
    component: SVGEditor,
    label: SVG_EDITOR_LABEL,
    id: '5',
    isProtected: true,
    icon: <IconBrandDatabricks title="SVG Editor" />,
  },
];

export const ANALYTICS_ROUTES = [DASHBOARD_ROUTE, MODEL_COMPARISON_ROUTE];
