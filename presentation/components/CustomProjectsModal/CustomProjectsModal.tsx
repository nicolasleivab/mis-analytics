import { Modal } from '@mantine/core';
import { CustomButton, CustomTable } from '..';
import { TUserProject } from '../../../model/User/definitions';
import {
  retrieveProject,
  setCurrentProject,
  useAppDispatch,
} from '../../../model';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../../application/controller/Router/routes';

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

  const handleConfirm = async (project: TUserProject) => {
    await dispatch(retrieveProject(project.id));
    dispatch(setCurrentProject(project.name));
    navigate(DASHBOARD_ROUTE);
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
        headers={['name', 'createdAt', 'updatedAt', 'action']}
        data={projects}
        caption={'Saved projects'}
        customRenderers={{
          action: (cellValue, row) => (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <CustomButton onClick={() => handleConfirm(row as TUserProject)}>
              Load project
            </CustomButton>
          ),
        }}
      />
    </Modal>
  );
}
