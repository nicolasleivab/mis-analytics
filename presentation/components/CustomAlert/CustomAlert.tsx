import { useEffect, useState } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  clearUserError,
  selectUser,
} from '../../../model';
import * as styles from './CustomAlert.module.css';

export default function CustomAlert() {
  const { error } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      console.log('error:', error);
      // Auto-hide after 3s
      const timer = setTimeout(() => {
        dispatch(clearUserError());
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [error, dispatch]);

  if (!error || !visible) {
    return null; // No error to show
  }

  return (
    <div className={styles.alertContainer}>
      <p className={styles.alertText}>{`Error: ${error}`}</p>
    </div>
  );
}
