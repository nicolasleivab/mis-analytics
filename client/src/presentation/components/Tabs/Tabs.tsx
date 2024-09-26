import { Tabs } from '@mantine/core';
import { useContext } from 'react';
import { TabsContext } from '../../../application/context/Tabs/TabsProvider';
import { TTab } from '../../../application/constants/config-values';

export type TCustomTab = string | null;

interface TCustomTabsProps {
  tabs: TTab[];
}

const TABS_MARGIN = 30;
export default function CustomTabs({ tabs }: TCustomTabsProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const setCurrentTab = (tab: TCustomTab) => {
    const typedActiveTab = tab as TTab;
    setActiveTab(typedActiveTab);
  };

  return (
    <Tabs
      value={activeTab}
      onChange={setCurrentTab}
      style={{ marginBottom: TABS_MARGIN }}
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab} value={tab}>
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {/* {tabs.map((tab) => (
        <Tabs.Panel key={tab} value={tab}>
          {tab}
        </Tabs.Panel>
      ))} */}
    </Tabs>
  );
}
