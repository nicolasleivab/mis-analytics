import * as styles from './Dashboard.module.css';
import {
  OVERVIEW_TAB,
  TABS,
} from '../../../application/constants/config-values';
import Overview from './sections/Overview';
import { CustomTabs } from '../../components';
import { TabsContext } from '../../../application/context/Tabs/TabsProvider';
import { useContext } from 'react';

export default function Dashboard() {
  const { activeTab } = useContext(TabsContext);

  return (
    <div className={styles.Dashboard}>
      <CustomTabs tabs={TABS} />
      {activeTab === OVERVIEW_TAB ? <Overview /> : null}
    </div>
  );
}
