import * as styles from './Card.module.css';

export interface TCard {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export default function Card({
  children,
  width = 'fit-content',
  height = 'auto',
}: TCard) {
  return (
    <div style={{ width, height }} className={styles.Card}>
      {children}
    </div>
  );
}
