import * as styles from './Dashboard.module.css';
import Overview from './sections/Overview';
import { Box, Button, CloseButton, Flex, Text } from '@mantine/core';
import { useViews } from '../../../model/hooks';
import {
  selectAllSvgParts,
  selectSvgLoading,
  useAppSelector,
} from '../../../model';

export default function Dashboard() {
  const { views, addView, removeView } = useViews();
  const svgPartsLoading = useAppSelector(selectSvgLoading);
  const svgParts = useAppSelector(selectAllSvgParts);

  if (svgPartsLoading) {
    return (
      <div className={styles.Dashboard}>
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Text>Loading SVG parts...</Text>
        </Flex>
      </div>
    );
  }

  if (svgParts.length === 0 && !svgPartsLoading) {
    return (
      <div className={styles.Dashboard}>
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Text>No SVG parts found. Please import an SVG file first.</Text>
        </Flex>
      </div>
    );
  }

  const renderViews = () =>
    views.map((view) => (
      <Box key={view.id} className={styles.View}>
        <CloseButton onClick={() => removeView(view.id)} />
        <Overview />
      </Box>
    ));

  return (
    <div className={styles.Dashboard}>
      <Flex direction="column">
        <Flex align="center" gap="sm">
          <Button onClick={addView}>Add view</Button>
          <Text>{`Active views: ${views.length}`}</Text>
        </Flex>
        {renderViews()}
      </Flex>
    </div>
  );
}
