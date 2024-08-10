import React from 'react';
import * as styles from './Button.module.css';

export type TButtonType = 'primary' | 'secondary' | 'tertiary' | 'disabled';

export interface TRoundButton extends React.ComponentPropsWithRef<'button'> {
  children: React.ReactNode;
  buttonType?: TButtonType;
  width?: string;
}

export default function Button({
  children,
  onClick,
  buttonType = 'primary',
  width = 'auto',
}: TRoundButton): JSX.Element {
  return (
    <button
      disabled={buttonType === 'disabled'}
      className={
        buttonType === 'disabled' ? styles.ButtonDisabled : styles.Button
      }
      onClick={onClick}
      style={{ width }}
    >
      {children}
    </button>
  );
}

// function getClassName(buttonType: TButtonType): string {
//   if (buttonType === 'tertiary') {
//     return styles.ButtonTertiary
//   } else if (buttonType === 'disabled') {
//     return styles.ButtonDisabled
//   }

//   return buttonType === 'primary' ? styles.ButtonPrimary : styles.ButtonSecondary
// }
