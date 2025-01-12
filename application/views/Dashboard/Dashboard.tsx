import * as styles from './Dashboard.module.css';
import Overview from './sections/Overview';
import { CustomTabs } from '../../../presentation/components';
import ModelComparison from './sections/ModelComparison';
import { Box, Button, CloseButton, Flex, Text } from '@mantine/core';
import { useViews } from '../../../model/hooks';
import { TABS } from '../../../model/definitions/Tabs';
import { useEffect } from 'react';
import {
  fetchSvgParts,
  selectAllSvgParts,
  selectSvgLoading,
  useAppDispatch,
  useAppSelector,
} from '../../../model';

export default function Dashboard() {
  const { views, addView, removeView, isOverviewTabActive } = useViews();
  const dispatch = useAppDispatch();
  const svgPartsLoading = useAppSelector(selectSvgLoading);
  const svgParts = useAppSelector(selectAllSvgParts);

  useEffect(() => {
    dispatch(fetchSvgParts()).catch((error) => {
      console.error('Failed to fetch SVG parts:', error);
    });
  }, [dispatch]);

  if (svgPartsLoading) {
    return (
      <div className={styles.Dashboard}>
        <CustomTabs tabs={TABS} />
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Text>Loading SVG parts...</Text>
        </Flex>
      </div>
    );
  }

  if (svgParts.length === 0 && !svgPartsLoading) {
    return (
      <div className={styles.Dashboard}>
        <CustomTabs tabs={TABS} />
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

  if (!isOverviewTabActive) {
    return (
      <div className={styles.Dashboard}>
        <CustomTabs tabs={TABS} />
        <ModelComparison />
      </div>
    );
  }

  return (
    <div className={styles.Dashboard}>
      <CustomTabs tabs={TABS} />
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
