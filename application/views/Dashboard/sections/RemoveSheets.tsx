import { Flex, Modal } from '@mantine/core';
import {
  selectAllClipPaths,
  selectAllSheets,
  selectAllSvgParts,
  selectAllVariableFields,
  selectCurrentProject,
  selectIdField,
  selectSvgThresholds,
  selectUpdateMode,
  selectUser,
  setUpdateMode,
  updateProject,
  useAppDispatch,
  useAppSelector,
} from '../../../../model';
import { CustomButton, CustomTable } from '../../../../presentation/components';
import { MODAL_OFFSET } from '../../Home/Home';
import { IconTrash } from '@tabler/icons-react';
import { verifyUser } from '../../../../model/User/userThunks';
import { TPolymorphicRecord } from '../../../../model/Project/definitions';

export default function RemoveSheets() {
  const excelData = useAppSelector(selectAllSheets);
  const updateMode = useAppSelector(selectUpdateMode);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const currentProject = useAppSelector(selectCurrentProject);
  const svgParts = useAppSelector(selectAllSvgParts);
  const variableFields = useAppSelector(selectAllVariableFields);
  const clipPaths = useAppSelector(selectAllClipPaths);
  const svgThresholds = useAppSelector(selectSvgThresholds);
  const idField = useAppSelector(selectIdField);

  const tableData = excelData.map((sheet) => ({
    name: sheet.name,
  }));

  const handleRemoveSheet = async (sheetToRemove: TPolymorphicRecord) => {
    const filteredSheets = excelData.filter(
      (sheet) => sheet.name !== sheetToRemove.name
    );
    await dispatch(
      updateProject({
        data: [...filteredSheets],
        variableFields,
        name: currentProject.name,
        svgJson: svgParts,
        clipPathsJson: clipPaths,
        svgThresholds: svgThresholds,
        idField,
        user: user!,
        id: currentProject.id,
      })
    );
    await dispatch(verifyUser());
    dispatch(setUpdateMode(null));
  };

  return (
    <Modal
      size="xl"
      yOffset={MODAL_OFFSET}
      opened={updateMode === 'removeData'}
      onClose={() => dispatch(setUpdateMode(null))}
      title="Select a project to load"
    >
      <CustomTable
        headers={['name', 'remove']}
        data={tableData}
        caption={'Saved projects'}
        customRenderers={{
          remove: (cellValue, row) => (
            <CustomButton
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => handleRemoveSheet(row)}
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
