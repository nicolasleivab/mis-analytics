// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { Flex } from '../../layout';
import * as styles from './Nav.module.css';
import { Logo } from '../../assets/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
} from '../../../application/router/routes';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeLink = useCallback(
    (link) => {
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

  const handleKeyPress = useCallback(
    (event, route) => {
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
          <Link
            to={HOME_ROUTE}
            className={activeLink(HOME_ROUTE)}
            onKeyDown={(e) => handleKeyPress(e, HOME_ROUTE)}
          >
            Home
          </Link>
          <Link
            to={DASHBOARD_ROUTE}
            className={activeLink(DASHBOARD_ROUTE)}
            onKeyDown={(e) => handleKeyPress(e, DASHBOARD_ROUTE)}
          >
            Dashboard
          </Link>
        </Flex>
        {/* TODO: Fix theme conflicts */}
        {/* <ThemeToggle /> */}
      </Flex>
    </div>
  );
}
