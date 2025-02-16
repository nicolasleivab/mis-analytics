import * as styles from './Dashboard.module.css';
import Overview from './sections/Overview';
import { CloseButton, Flex, Input, Text } from '@mantine/core';
import { useViews } from '../../../model/hooks';
import {
  createProject,
  selectAllClipPaths,
  selectAllSheets,
  selectAllSvgParts,
  selectAllVariableFields,
  selectCurrentProject,
  selectSvgLoading,
  selectSvgThresholds,
  selectUser,
  setCurrentProject,
  useAppDispatch,
  useAppSelector,
} from '../../../model';
import { CustomButton, CustomCard } from '../../../presentation/components';
import { useState } from 'react';
import { verifyUser } from '../../../model/User/userThunks';

export default function Dashboard() {
  const { views, addView, removeView } = useViews();
  const svgPartsLoading = useAppSelector(selectSvgLoading);
  const svgParts = useAppSelector(selectAllSvgParts);
  const variableFields = useAppSelector(selectAllVariableFields);
  const clipPaths = useAppSelector(selectAllClipPaths);
  const svgThresholds = useAppSelector(selectSvgThresholds);
  const { user } = useAppSelector(selectUser);
  const currentProject = useAppSelector(selectCurrentProject);
  const sheets = useAppSelector(selectAllSheets);
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState('');

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

  const saveProject = async () => {
    await dispatch(
      createProject({
        data: sheets,
        variableFields,
        name: projectName,
        svgJson: svgParts,
        clipPathsJson: clipPaths,
        svgThresholds: svgThresholds,
        user: user!,
      })
    );
    await dispatch(verifyUser());
    dispatch(setCurrentProject(projectName));
  };

  return (
    <div className={styles.Dashboard}>
      <Flex
        justify="flex-start"
        align="center"
        gap="15px"
        style={{ marginBottom: '15px', fontSize: '22px' }}
      >
        {currentProject ? (
          <h2>{`Project: ${currentProject}`}</h2>
        ) : (
          <>
            <Input
              placeholder="Name project to save"
              type="string"
              onChange={(e) => setProjectName(e.target.value)}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <CustomButton disabled={!projectName} onClick={saveProject}>
              Save project
            </CustomButton>{' '}
          </>
        )}
      </Flex>
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
