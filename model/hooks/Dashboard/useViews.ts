import { useState, useCallback } from 'react';
import { FIRST_MODEL, TView } from '../../definitions/Tabs';

export default function useViews() {
  const [views, setViews] = useState<TView[]>([FIRST_MODEL]);

  const addView = () => {
    setViews((prevViews) => [...prevViews, { id: `${views.length + 1}` }]);
  };

  const removeView = useCallback((viewId: string) => {
    setViews((prevViews) => prevViews?.filter((view) => view.id !== viewId));
  }, []);

  return {
    views,
    addView,
    removeView,
  };
}
