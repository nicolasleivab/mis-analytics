import { IconBrandGithubFilled } from '@tabler/icons-react';
import * as styles from './GithubLink.module.css';

export default function GithubIcon() {
  return (
    <a
      href="https://github.com/nicolasleivab/mis-analytics"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.container}
    >
      <IconBrandGithubFilled className={styles.icon} />
    </a>
  );
}
