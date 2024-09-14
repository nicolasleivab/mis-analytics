import { Tabs } from '@mantine/core';
import { useState } from 'react';

export type TTab = string | null;

interface TCustomTabsProps {
  tabs: TTab[];
}

export default function CustomTabs({ tabs }: TCustomTabsProps) {
  const [activeTab, setActiveTab] = useState<TTab>(tabs[0]);

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab} value={tab!}>
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel key={tab} value={tab!}>
          {tab}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
