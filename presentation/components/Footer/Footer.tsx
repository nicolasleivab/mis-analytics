import * as styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a
        href="#https://github.com/nicolasleivab/mis-analytics"
        target="_blank"
        rel="noopener noreferrer"
      >
        MIS-Analytics
      </a>{' '}
      is an open source project. Code licensed under{' '}
      <a
        href="#https://github.com/nicolasleivab/mis-analytics?tab=MIT-1-ov-file"
        target="_blank"
        rel="noopener noreferrer"
      >
        MIT License
      </a>
    </div>
  );
}
