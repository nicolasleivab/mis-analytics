import { Flex } from '@mantine/core';
import * as styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.NotFoundPage}>
      <Flex align="baseline" justify="center" gap="20px">
        <h1>404 Not Found</h1>
        <span className={styles.SadEmoji}>{`:(`}</span>
      </Flex>
      <p>{`Oops! The page you're looking for doesn't exist`}</p>
    </div>
  );
}

export default NotFoundPage;
