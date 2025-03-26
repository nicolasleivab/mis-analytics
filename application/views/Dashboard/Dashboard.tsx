import * as styles from './Dashboard.module.css';
import Overview from './sections/Overview';
import { CloseButton, Flex, Text } from '@mantine/core';
import { useViews } from '../../../model/hooks';
import {
  selectAllSvgParts,
  selectSvgLoading,
  useAppSelector,
} from '../../../model';
import { CustomButton, CustomCard } from '../../../presentation/components';
import HeaderOptions from './sections/HeaderOptions';

export default function Dashboard() {
  const { views, addView, removeView } = useViews();
  const svgPartsLoading = useAppSelector(selectSvgLoading);
  const svgParts = useAppSelector(selectAllSvgParts);

  if (svgPartsLoading) {
    return (
      <div className={styles.Dashboard}>
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Text>Loading SVG parts...</Text>
        </Flex>
      </div>
    );
  }

  if (svgParts.length === 0 && !svgPartsLoading) {
    return (
      <div className={styles.Dashboard}>
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          <Text>No SVG parts found. Please import an SVG file first.</Text>
        </Flex>
      </div>
    );
  }

  const renderViews = () =>
    views.map((view) => (
      <CustomCard key={view.id} style={{ margin: '10px 0' }}>
        <CloseButton onClick={() => removeView(view.id)} />
        <Overview />
      </CustomCard>
    ));

  return (
    <div className={styles.Dashboard}>
      <HeaderOptions />
      <Flex direction="column">
        <Flex align="center" gap="sm">
          <CustomButton onClick={addView}>Add view</CustomButton>
          <Text>{`Active views: ${views.length}`}</Text>
        </Flex>
        {renderViews()}
      </Flex>
    </div>
  );
}
