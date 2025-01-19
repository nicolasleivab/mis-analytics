import { Button } from '@mantine/core';
import * as styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../controller/Router/routes';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className={styles.Login}>
      <Button onClick={() => navigate(HOME_ROUTE)}>Login</Button>
    </div>
  );
}
