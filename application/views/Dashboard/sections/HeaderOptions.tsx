import { Flex } from '@chakra-ui/react';
import { Alert, Modal, TextInput } from '@mantine/core';
import { useMemo, useState } from 'react';
import {
  createProject,
  updateProject,
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
  UPDATE_OPTIONS,
  selectUpdateMode,
  setUpdateMode,
  TUpdateMode,
  // addNewSheet,
  TExcelSheet,
} from '../../../../model';
import * as styles from '../Dashboard.module.css';
import { Input, Select } from '@mantine/core';
import { CustomButton } from '../../../../presentation/components';
import { IconAlertCircle, IconSettings } from '@tabler/icons-react';
import { TUserProject } from '../../../../model/User/definitions';
import { verifyUser } from '../../../../model/User/userThunks';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { MODAL_OFFSET } from '../../Home/Home';

export default function HeaderOptions() {
  const [newSheet, setNewSheet] = useState('');
  const [openUpdateDropdown, setOpenUpdateDropdown] = useState(false);
  const [openNameModal, setOpenNameModal] = useState(false);
  const [customSheetName, setCustomSheetName] = useState('');
  const [showSheetAlert, setShowSheetAlert] = useState(false);
  const updateMode = useAppSelector(selectUpdateMode);
  const { user } = useAppSelector(selectUser);
  const currentProject = useAppSelector(selectCurrentProject);
  const dispatch = useAppDispatch();
  const svgParts = useAppSelector(selectAllSvgParts);
  const variableFields = useAppSelector(selectAllVariableFields);
  const clipPaths = useAppSelector(selectAllClipPaths);
  const svgThresholds = useAppSelector(selectSvgThresholds);
  const sheets = useAppSelector(selectAllSheets);
  const idField = useAppSelector(selectIdField);

  const importFields = useMemo(
    () =>
      variableFields.map((field) => ({
        label: field.name,
        key: field.name,
        fieldType: { type: 'input' },
      })),
    [variableFields]
  );

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

  const updateProjectHandler = async () => {
    await dispatch(
      updateProject({
        data: sheets,
        variableFields,
        name: projectName,
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

  const handleSaveSheet = async () => {
    if (!customSheetName) {
      setShowSheetAlert(true);
      return;
    }

    const typedSheet = newSheet as unknown as unknown[][];
    await dispatch(
      updateProject({
        data: [
          ...(sheets as TExcelSheet[]),
          {
            data: typedSheet,
            name: customSheetName,
            filters: sheets[0].filters,
          },
        ],
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
    setOpenNameModal(false);
  };
  if (user?.id === GUEST_ID) {
    return null;
  }
  console.log(sheets);
  if (updateMode === 'updateTitle') {
    return (
      <Flex
        justify="flex-start"
        align="center"
        gap="15px"
        style={{ marginBottom: '15px', fontSize: '22px' }}
      >
        <Input
          placeholder="Name project to save"
          defaultValue={currentProject.name}
          type="string"
          onChange={(e) => setProjectName(e.target.value)}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <CustomButton disabled={!projectName} onClick={updateProjectHandler}>
          Save project
        </CustomButton>
        <CustomButton
          variant="secondary"
          onClick={() => dispatch(setUpdateMode(null))}
        >
          Cancel
        </CustomButton>{' '}
      </Flex>
    );
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
                onChange={(val) => dispatch(setUpdateMode(val as TUpdateMode))}
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
      <ReactSpreadsheetImport
        isOpen={updateMode === 'updateData'}
        // initialStepState={{ data: excelFile! }} TODO: Find a solution for the excel upload flow to avoid repittions
        onClose={() => dispatch(setUpdateMode(null))}
        onSubmit={(data) => {
          setNewSheet(data.validData as unknown as string);
          setOpenNameModal(true);
        }}
        fields={importFields}
        customTheme={{
          colors: {
            highlight: '#CCC',
            rsi: {
              500: '#1b1b1b',
              600: '#444',
              700: '#444',
            },
          },
        }}
      />
      {/* Sheet Naming Modal */}
      <Modal
        yOffset={MODAL_OFFSET}
        opened={openNameModal}
        onClose={() => setOpenNameModal(false)}
        title="Name your sheet"
        size="xl"
      >
        {/* Display the alert if no sheet name is entered */}
        {showSheetAlert && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error!"
            color="red"
            withCloseButton
            onClose={() => setShowSheetAlert(false)}
            mb="md"
          >
            Please provide a valid sheet name.
          </Alert>
        )}

        <TextInput
          label="Enter a name for the sheet"
          placeholder="Sheet name"
          value={customSheetName}
          onChange={(e) => setCustomSheetName(e.currentTarget.value)}
          required
        />
        <Flex
          justify="flex-end"
          gap="20px"
          style={{ width: '100%', marginTop: 20 }}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <CustomButton onClick={handleSaveSheet}>
            Add new data sheet
          </CustomButton>
        </Flex>
      </Modal>
    </Flex>
  );
}
