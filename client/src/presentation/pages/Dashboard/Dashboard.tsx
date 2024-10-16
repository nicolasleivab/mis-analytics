import * as styles from './Dashboard.module.css';
import {
  OVERVIEW_TAB,
  TABS,
} from '../../../application/constants/config-values';
import Overview from './sections/Overview';
import { CustomTabs } from '../../components';
import { TabsContext } from '../../../application/context/Tabs/TabsProvider';
import { useContext, useState, useCallback } from 'react';
import ModelComparison from './sections/ModelComparison';
import { Box, Button, CloseButton, Flex, Text } from '@mantine/core';

export interface TView {
  id: string;
}

const FIRST_MODEL: TView = {
  id: '1',
};

export default function Dashboard() {
  const { activeTab } = useContext(TabsContext);
  const [views, setViews] = useState<TView[]>([FIRST_MODEL]);


  const removeCurrentView = useCallback((viewId: string) => {
    setViews((prevViews) => prevViews.filter((view) => view.id !== viewId));
  }, []);

  const addView = () => {
    setViews((prevViews) => [...prevViews, { id: `${views.length + 1}` }]);
  };

  const renderViews = () =>
    views.map((view) => (
      <Box key={view.id} className={styles.View}>
        <CloseButton onClick={() => removeCurrentView(view.id)} />
        <Overview />
      </Box>
    ));

 
  if (activeTab !== OVERVIEW_TAB) {
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
