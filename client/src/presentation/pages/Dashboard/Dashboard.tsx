import * as styles from './Dashboard.module.css';
import Overview from './sections/Overview';
import { CustomTabs } from '../../components';
import ModelComparison from './sections/ModelComparison';
import { Box, Button, CloseButton, Flex, Text } from '@mantine/core';
import { useViews } from '../../../application/hooks';
import { TABS } from '../../../application/constants/config-values';

export default function Dashboard() {
  const { views, addView, removeView, isOverviewTabActive } = useViews();

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
        <CustomTabs tabs={TABS}/>
        <ModelComparison />
      </div>
    );
  }

  return (
    <div className={styles.Dashboard}>
      <CustomTabs tabs={TABS}/>
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
