import React, { useEffect, useState } from 'react';

import { Dispatch, SetStateAction } from 'react';
import { TABS, TTab } from '../../constants/config-values';

export interface TTabsContext {
  activeTab: TTab;
  setActiveTab: Dispatch<SetStateAction<TTab>>;
}

export const TabsContext = React.createContext<TTabsContext>({
  activeTab: 'Overview',
  setActiveTab: () => console.log('set activeTab'),
});

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
