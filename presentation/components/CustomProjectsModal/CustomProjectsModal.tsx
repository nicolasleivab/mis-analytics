import { Flex, Modal } from '@mantine/core';
import { CustomButton, CustomTable } from '..';
import { TUserProject } from '../../../model/User/definitions';
import {
  removeProject,
  retrieveProject,
  setCurrentProject,
  useAppDispatch,
} from '../../../model';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../../application/controller/Router/routes';
import { verifyUser } from '../../../model/User/userThunks';
import { IconChartBar, IconTrash } from '@tabler/icons-react';

type TProjectsModal = {
  projects: TUserProject[];
  isOpen: boolean;
  onCloseHandler: () => void;
  yOffset: number;
};

export default function CustomProjectsModal({
  projects,
  isOpen,
  onCloseHandler,
  yOffset,
}: TProjectsModal) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoadProject = async (project: TUserProject) => {
    await dispatch(retrieveProject(project.id));
    dispatch(setCurrentProject({ name: project.name, id: project.id }));
    navigate(DASHBOARD_ROUTE);
  };

  const handleRemoveProject = async (project: TUserProject) => {
    await dispatch(removeProject(project.id));
    await dispatch(verifyUser());
    // if (projects.length === 0) {
    //   onCloseHandler();
    // }
  };

  return (
    <Modal
      size="xl"
      yOffset={yOffset}
      opened={isOpen}
      onClose={onCloseHandler}
      title="Select a sheet to remove"
    >
      <CustomTable
        headers={['name', 'createdAt', 'updatedAt', 'load', 'remove']}
        data={projects}
        caption={'Saved projects'}
        customRenderers={{
          load: (cellValue, row) => (
            <CustomButton
              variant="secondary"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => handleLoadProject(row as TUserProject)}
            >
              <Flex
                align="center"
                justify={'space-evenly'}
                style={{ width: '100%' }}
              >
                <IconChartBar />
                Load
              </Flex>
            </CustomButton>
          ),
          remove: (cellValue, row) => (
            <CustomButton
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => handleRemoveProject(row as TUserProject)}
            >
              <Flex
                align="center"
                justify={'space-evenly'}
                style={{ width: '100%' }}
              >
                <IconTrash />
                Remove
              </Flex>
            </CustomButton>
          ),
        }}
      />
    </Modal>
  );
}
