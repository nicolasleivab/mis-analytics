import React from 'react';
import * as styles from './CustomCard.module.css';

type CustomCardProps = {
  /**
   * Optionally override the card width.
   * Default is "fit-content".
   */
  width?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * CustomCard - a reusable card component with default styling
 */
export default function CustomCard({
  width = 'fit-content',
  children,
  ...rest
}: CustomCardProps) {
  return (
    <div className={styles.customCard} style={{ width }} {...rest}>
      {children}
    </div>
  );
}
