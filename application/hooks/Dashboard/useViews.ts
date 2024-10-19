import { useContext, useState, useCallback } from 'react';
import { TabsContext } from '../../../application/context/Tabs/TabsProvider';
import { OVERVIEW_TAB } from '../../../application/constants/config-values';

export interface TView {
  id: string;
}

const FIRST_MODEL: TView = {
  id: '1',
};

export default function useViews() {
  const { activeTab } = useContext(TabsContext);
  const [views, setViews] = useState<TView[]>([FIRST_MODEL]);

  const addView = () => {
    setViews((prevViews) => [...prevViews, { id: `${views.length + 1}` }]);
  };

  const removeView = useCallback((viewId: string) => {
    setViews((prevViews) => prevViews.filter((view) => view.id !== viewId));
  }, []);

  const isOverviewTabActive = activeTab === OVERVIEW_TAB;

  return {
    views,
    addView,
    removeView,
    isOverviewTabActive,
    activeTab,
  };
}
