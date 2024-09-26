import * as styles from './Dashboard.module.css';
import {
  OVERVIEW_TAB,
  TABS,
} from '../../../application/constants/config-values';
import Overview from './sections/Overview';
import { CustomTabs } from '../../components';
import { TabsContext } from '../../../application/context/Tabs/TabsProvider';
import { useContext, useState } from 'react';
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

  const renderViews = () => {
    return views.map((view) => {
      const removeCurrentView = () => {
        setViews((prevViews) =>
          prevViews.filter((currentView) => currentView.id !== view.id)
        );
      };

      return (
        <Box key={view.id} className={styles.View}>
          <CloseButton onClick={() => removeCurrentView()} />
          <Overview />
        </Box>
      );
    });
  };

  return (
    <div className={styles.Dashboard}>
      <CustomTabs tabs={TABS} />
      {activeTab === OVERVIEW_TAB ? (
        <Flex direction="column">
          <Flex align="baseline">
            <Box style={{ marginRight: 10 }}>
              <Button
                onClick={() =>
                  setViews((prevViews) => [
                    ...prevViews,
                    { id: `${views.length + 1}` },
                  ])
                }
              >
                Add view
              </Button>
            </Box>
            <Box>
              <Text>{`Active views: ${views.length}`}</Text>
            </Box>
          </Flex>
          {renderViews()}
        </Flex>
      ) : (
        <ModelComparison />
      )}
    </div>
  );
}
