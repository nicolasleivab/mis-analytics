import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import {
  createProject,
  GUEST_ID,
  selectAllClipPaths,
  selectAllSheets,
  selectAllSvgParts,
  selectAllVariableFields,
  selectCurrentProject,
  selectIdField,
  selectSvgThresholds,
  selectUser,
  setCurrentProject,
  useAppDispatch,
  useAppSelector,
} from '../../../../model';
import * as styles from '../Dashboard.module.css';
import { Input, Select } from '@mantine/core';
import { CustomButton } from '../../../../presentation/components';
import { IconSettings } from '@tabler/icons-react';
import { TUserProject } from '../../../../model/User/definitions';
import { verifyUser } from '../../../../model/User/userThunks';

const UPDATE_OPTIONS = [
  { value: 'updateTitle', label: 'Update title' },
  { value: 'updateData', label: 'Update data' },
];

export default function HeaderOptions() {
  const [openUpdateDropdown, setOpenUpdateDropdown] = useState(false);
  const { user } = useAppSelector(selectUser);
  const currentProject = useAppSelector(selectCurrentProject);
  const dispatch = useAppDispatch();
  const svgParts = useAppSelector(selectAllSvgParts);
  const variableFields = useAppSelector(selectAllVariableFields);
  const clipPaths = useAppSelector(selectAllClipPaths);
  const svgThresholds = useAppSelector(selectSvgThresholds);
  const sheets = useAppSelector(selectAllSheets);
  const idField = useAppSelector(selectIdField);

  const [projectName, setProjectName] = useState('');

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

  if (user?.id === GUEST_ID) {
    return null;
  }

  return (
    <Flex
      justify="flex-start"
      align="center"
      gap="15px"
      style={{ marginBottom: '15px', fontSize: '22px' }}
    >
      {currentProject.id !== '' ? (
        <Flex align="center" gap="10px">
          <h2>{`Project: ${currentProject.name}`}</h2>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {!openUpdateDropdown ? (
              <button
                className={styles.InvisibleButton}
                onClick={() =>
                  setOpenUpdateDropdown((prev) => {
                    return !prev;
                  })
                }
              >
                <IconSettings size={30} />
              </button>
            ) : null}
            {openUpdateDropdown ? (
              <Select
                defaultDropdownOpened
                label="Update options"
                placeholder="Select an action"
                onChange={(val) => console.log(val, 'selected action')}
                data={UPDATE_OPTIONS}
                onDropdownClose={() => setOpenUpdateDropdown(false)}
              />
            ) : null}
          </div>
        </Flex>
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
  );
}
