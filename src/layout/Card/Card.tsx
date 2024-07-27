import * as styles from "./Card.module.css";

export type TCard = {
  children: React.ReactNode;
};

export default function Card({ children }: TCard) {
  return <div className={styles.Card}>{children}</div>;
}
