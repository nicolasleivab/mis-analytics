import * as styles from './Nav.module.css';
import { Logo } from '../../../presentation/assets/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
  APP_ROUTES as routes,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  TRoute,
  ANALYTICS_ROUTES,
} from '../Router/routes';
// import ThemeToggle from '../ThemeToggle/ThemeToggle';

import {
  clearProjectData,
  GUEST_ID,
  logoutGuestUser,
  logoutUser,
  selectAllSheets,
  selectAllSvgParts,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '../../../model';
import { Flex } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

export default function Nav() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectUser);
  const excelData = useAppSelector(selectAllSheets);
  const svgParts = useAppSelector(selectAllSvgParts);
  const shouldHideAnalyticsTabs =
    (user && excelData.length === 0) ?? (user && svgParts.length === 0);

  const activeLink = useCallback(
    (link: string): string => {
      if (location.pathname === '/' && link === HOME_ROUTE) {
        return styles.activeLink;
      }
      if (location.pathname === link) {
        return styles.activeLink;
      }
      return styles.inactiveLink;
    },
    [location.pathname]
  );

  type KeyPressEvent = {
    key: string;
  };

  const handleKeyPress = useCallback(
    (event: KeyPressEvent, route: string): void => {
      if (event?.key === 'Enter') {
        navigate(route);
      }
    },
    [navigate]
  );

  const handleLogout = async () => {
    if (user?.id === GUEST_ID) {
      return dispatch(logoutGuestUser());
    }
    try {
      dispatch(clearProjectData());
      await dispatch(logoutUser());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (
    location.pathname === LOGIN_ROUTE ||
    location.pathname === REGISTER_ROUTE
  ) {
    return null;
  }

  const preFilteredRoutes = shouldHideAnalyticsTabs
    ? routes.filter((route: TRoute) => !ANALYTICS_ROUTES.includes(route.path))
    : routes;

  return (
    <div className={styles.Nav}>
      <Flex justify="center" align="center" style={{ padding: '20px' }}>
        <Flex
          direction="column"
          justify="flex-start"
          align="center"
          gap={'40px'}
        >
          <Logo />
          {/* <h2 className={styles.title}>MIS Analytics</h2> */}
          {preFilteredRoutes
            .filter((route: TRoute) => route.isProtected)
            .map((route: TRoute) => (
              <Link
                key={route.id}
                to={route.path}
                className={activeLink(route.path)}
                onKeyDown={(e) => handleKeyPress(e, route.path)}
              >
                {route.icon}
              </Link>
            ))}
          <div className={styles.separator} />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <IconLogout onClick={handleLogout} title="Logout" />
        </Flex>
        {/* TODO: Fix theme conflicts */}
        {/* <ThemeToggle /> */}
      </Flex>
    </div>
  );
}
