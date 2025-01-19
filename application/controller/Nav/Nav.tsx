import * as styles from './Nav.module.css';
import { Logo } from '../../../presentation/assets/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { APP_ROUTES as routes, HOME_ROUTE } from '../Router/routes';
// import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { Flex } from '../../../presentation/layout';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className={styles.Nav}>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex padding="20px" justifyContent="flex-start" alignItems="center">
          <Logo />
          <h2 className={styles.title}>MIS Analytics</h2>
          {routes.map((route) => (
            <Link
              key={route.id}
              to={route.path}
              className={activeLink(route.path)}
              onKeyDown={(e) => handleKeyPress(e, route.path)}
            >
              {route.label}
            </Link>
          ))}
        </Flex>
        {/* TODO: Fix theme conflicts */}
        {/* <ThemeToggle /> */}
      </Flex>
    </div>
  );
}
