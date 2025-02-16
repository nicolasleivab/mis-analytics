import { Modal } from '@mantine/core';
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
      title="Select a project to load"
    >
      <CustomTable
        headers={['name', 'createdAt', 'updatedAt', 'load', 'remove']}
        data={projects}
        caption={'Saved projects'}
        customRenderers={{
          load: (cellValue, row) => (
            <CustomButton
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => handleLoadProject(row as TUserProject)}
            >
              Load project
            </CustomButton>
          ),
          remove: (cellValue, row) => (
            <CustomButton
              variant="secondary"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => handleRemoveProject(row as TUserProject)}
            >
              Remove
            </CustomButton>
          ),
        }}
      />
    </Modal>
  );
}
