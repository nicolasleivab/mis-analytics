import React, { useEffect, useState } from 'react';

import { Dispatch, SetStateAction } from 'react';
import { TABS, TTab } from '../../definitions/Tabs';
import { TabsContext } from '..';

export type TTabsContext = {
  activeTab: TTab;
  setActiveTab: Dispatch<SetStateAction<TTab>>;
};

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TTab>(TABS[0]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};
