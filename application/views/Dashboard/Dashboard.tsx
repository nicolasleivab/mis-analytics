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
  selectIdField,
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
import { TUserProject } from '../../../model/User/definitions';

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
  const idField = useAppSelector(selectIdField);
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
    const newProject = await dispatch(
      createProject({
        data: sheets,
        variableFields,
        name: projectName,
        svgJson: svgParts,
        clipPathsJson: clipPaths,
        svgThresholds: svgThresholds,
        idField,
        user: user!,
      })
    );
    await dispatch(verifyUser());

    const typedNewProject = newProject as { payload: TUserProject };
    dispatch(
      setCurrentProject({
        name: typedNewProject.payload.name,
        id: typedNewProject.payload.id,
      })
    );
  };

  return (
    <div className={styles.Dashboard}>
      <Flex
        justify="flex-start"
        align="center"
        gap="15px"
        style={{ marginBottom: '15px', fontSize: '22px' }}
      >
        {currentProject.id !== '' ? (
          <h2>{`Project: ${currentProject.name}`}</h2>
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
