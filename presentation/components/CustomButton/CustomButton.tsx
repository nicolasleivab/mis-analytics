import {
  MouseEvent,
  KeyboardEventHandler,
  ButtonHTMLAttributes,
  useCallback,
} from 'react';
import clsx from 'clsx'; // or "classnames"
import * as styles from './CustomButton.module.css';

type ButtonVariant = 'primary' | 'secondary';

type CustomButtonProps = {
  variant?: ButtonVariant;

  loading?: boolean;

  onPressEnter?: () => void;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export default function CustomButton({
  variant = 'primary',
  loading = false,
  onPressEnter,
  onClick,
  children,
  ...rest
}: CustomButtonProps) {
  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.key === 'Enter' && onPressEnter) {
        onPressEnter();
      }
    },
    [onPressEnter]
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  const isDisabled = rest.disabled ?? loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={clsx(styles.customButton, styles[variant])}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {loading ? (
        <span className={styles.loadingDots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
