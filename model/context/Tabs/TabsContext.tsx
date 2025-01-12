import { createContext } from 'react';
import { TTabsContext } from './TabsProvider';

export const TabsContext = createContext<TTabsContext>({
  activeTab: 'Overview',
  setActiveTab: () => console.log('set activeTab'),
});
