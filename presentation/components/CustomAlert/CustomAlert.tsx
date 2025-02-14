import { useEffect, useState } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  clearUserError,
  selectUser,
} from '../../../model';
import * as styles from './CustomAlert.module.css';

const UNRELEVANT_ERROR = 'No token provided';

export default function CustomAlert() {
  const { error } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);

      const timer = setTimeout(() => {
        dispatch(clearUserError());
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [error, dispatch]);

  if (!error || !visible || error === UNRELEVANT_ERROR) {
    return null;
  }

  return (
    <div className={styles.alertContainer}>
      <p className={styles.alertText}>{`Error: ${error}`}</p>
    </div>
  );
}
