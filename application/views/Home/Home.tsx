/* Images source: https://www.pexels.com/search/medical/ */
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import {
  Group,
  Modal,
  Text,
  TextInput,
  Alert,
  FileInput,
  Select,
  Input,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  useImportFields,
  useSvgUpload,
  useImportSheet,
  useAppSelector,
  selectUser,
  // useAppDispatch,
  // retrieveProject,
} from '../../../model';
import * as styles from './Home.module.css';
import {
  CustomButton,
  CustomExcelTypeModal,
  CustomProjectsModal,
} from '../../../presentation/components';
import { TExcelSheetData } from '../../../model/Project/definitions';
import { TStatId, TStatLabel } from '../../../model/definitions/Stats';
import { DEFAULT_THRESHOLD } from '../../../model/Project/definitions';
import { Flex } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import { DASHBOARD_ROUTE } from '../../controller/Router/routes';
import { useState } from 'react';

export const MODAL_OFFSET = 150;

const THRESHOLDS_OPTIONS: { value: TStatId; label: TStatLabel }[] = [
  { value: 'mean', label: 'Mean' },
  { value: 'median', label: 'Median' },
  { value: 'min', label: 'Min' },
  { value: 'max', label: 'Max' },
];

export default function Home() {
  const { user } = useAppSelector(selectUser);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [openProjectsModal, setOpenProjectsModal] = useState(false);

  const {
    openModal,
    setOpenImportModal,
    openNameModal,
    setOpenNameModal,
    openActionModal,
    setOpenActionModal,
    customSheetName,
    setCustomSheetName,
    showAlert: showSheetAlert,
    setShowAlert: setShowSheetAlert,
    handleImportClick,
    handleSaveSheetName,
    handleConfirmClick,
    importedSheets,
  } = useImportSheet();

  const {
    importFields: fields,
    handleOpenExcelTypeModal,
    handleTypeConfirm,
    isTypeModalOpen,
    setTypeModalOpen,
    excelFile,
  } = useImportFields(setOpenImportModal);

  const {
    setSvgPartsFile,
    setClipPathsFile,
    showAlert,
    setShowAlert,
    openSvgModal,
    setOpenSvgModal,
    handleSvgPartsSubmit,
    handleUseDefaultSvg,
    setSelectedThresholdStat,
    setSelectedThresholdValue1,
    setSelectedThresholdValue2,
  } = useSvgUpload(setTypeModalOpen);

  return (
    <div className={styles.Home}>
      <Flex gap="20px" padding="50px" direction="column" align={'center'}>
        <div className={styles.HomeText}>
          <h1>Welcome to MIS-Analytics</h1>
          <p>
            This tool is designed to help you analyze and compare different
            models for medical image segmentation. By evaluating these models,
            you can get insights about their performance with dynamically
            generated filters and user-driven configurations, thus enhancing
            your model analysis. While the tool was originally designed to
            provide insights on medical image segmentation performance metrics,
            its flexible architecture allows you to create your own analytics
            experience using any base SVG and any data set.
          </p>
          <p>
            To get started, please select an XLSX file containing your model
            results. Follow the import and data validation steps to properly
            import and parse your data into the system.
          </p>
        </div>
        <div className={styles.HomeImg}>
          <img
            src="/public/MISHome.png"
            alt="MIS Home"
            width="600"
            height="600"
          />
        </div>
      </Flex>
      {/* TODO: Factor out once ready */}
      <Flex justify={'center'} gap="20px">
        {user?.projects && user.projects.length > 0 ? (
          <Flex direction="column" gap="20px">
            <Flex align={'center'}>
              <CustomButton
                variant="secondary"
                onClick={() => setOpenProjectsModal(true)}
              >
                Load a project
              </CustomButton>
              <span style={{ margin: '0 15px 0 15px', fontSize: 20 }}>or</span>
              <CustomButton onClick={() => setOpenSvgModal(true)}>
                Start a New Project
              </CustomButton>
            </Flex>
          </Flex>
        ) : (
          <CustomButton onClick={() => setOpenSvgModal(true)}>
            Start New Project
          </CustomButton>
        )}
      </Flex>
      <CustomProjectsModal
        projects={user?.projects ?? []}
        isOpen={openProjectsModal}
        yOffset={MODAL_OFFSET}
        onCloseHandler={() => setOpenProjectsModal(false)}
      />
      {/* SVG Parts Modal */}
      <Modal
        yOffset={MODAL_OFFSET}
        opened={openSvgModal}
        onClose={() => setOpenSvgModal(false)}
        title="Upload SVG JSON Files for the Visualization"
        size="xl"
      >
        {showAlert && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error!"
            color="red"
            withCloseButton
            onClose={() => setShowAlert(false)}
            mb="md"
          >
            Please upload the required SVG Parts JSON.
          </Alert>
        )}
        <FileInput
          label="SVG Parts JSON (required)"
          onChange={setSvgPartsFile}
          required
          accept="application/json"
        />
        <FileInput
          label="Clip Paths JSON (optional)"
          onChange={setClipPathsFile}
          accept="application/json"
        />
        <Text mt="md" fw={500}>
          SVG threshold stat and values
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Select
            allowDeselect={false}
            defaultValue={DEFAULT_THRESHOLD.stat}
            placeholder="Select thresholds"
            onChange={(val) => setSelectedThresholdStat(val as TStatId)}
            data={THRESHOLDS_OPTIONS}
          />
          <div className={styles.Red} />
          <Input
            type="number"
            style={{ width: '70px' }}
            // label="Threshold value 1"
            defaultValue={DEFAULT_THRESHOLD.values[0]}
            onChange={(e) => setSelectedThresholdValue1(Number(e.target.value))}
          />
          <div className={styles.Yellow} />
          <Input
            type="number"
            style={{ width: '70px' }}
            defaultValue={DEFAULT_THRESHOLD.values[1]}
            // label="Threshold value 2"
            onChange={(e) => setSelectedThresholdValue2(Number(e.target.value))}
          />
          <div className={styles.Green} />
          <div />
        </Flex>
        <Group mt="xl">
          <Flex justifyContent="flex-end" gap="20px" style={{ width: '100%' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <CustomButton onClick={handleSvgPartsSubmit}>Upload</CustomButton>
            <CustomButton variant="secondary" onClick={handleUseDefaultSvg}>
              Use Default SVG
            </CustomButton>
          </Flex>
        </Group>
        <Flex justifyContent="space-between" style={{ marginTop: 20 }}>
          <a href="/public/bodySvg.json" className={styles.HomeLink} download>
            Download default svg json
          </a>
          <a
            href="/public/bodyClipPaths.json"
            className={styles.HomeLink}
            download
          >
            Download default clip paths json
          </a>
        </Flex>
      </Modal>
      {/* Header types Import Modal */}
      <CustomExcelTypeModal
        file={excelFile}
        modalOffset={MODAL_OFFSET}
        isOpen={isTypeModalOpen}
        onClose={() => setTypeModalOpen(false)}
        onFileSelected={handleOpenExcelTypeModal}
        onConfirm={handleTypeConfirm}
      />
      {/* Import Modal */}
      <ReactSpreadsheetImport
        isOpen={openModal}
        // initialStepState={{ data: excelFile! }} TODO: Find a solution for the excel upload flow to avoid repittions
        onClose={() => setOpenImportModal(false)}
        onSubmit={(data) => {
          const typedData = data?.validData as unknown as TExcelSheetData;
          handleImportClick(typedData);
          setOpenImportModal(false);
        }}
        fields={fields}
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
          <CustomButton onClick={handleSaveSheetName}>
            Save and Continue
          </CustomButton>
        </Flex>
      </Modal>
      {/* Action Modal */}
      <Modal
        yOffset={MODAL_OFFSET}
        opened={openActionModal}
        onClose={() => setOpenActionModal(false)}
        title="What would you like to do next?"
      >
        <Text>
          You have successfully imported the sheet:{' '}
          {importedSheets.length > 0 &&
            importedSheets[importedSheets.length - 1].name}
        </Text>
        <Flex
          direction={'column'}
          align={'flex-end'}
          gap="20px"
          style={{ marginTop: 20, width: '100%' }}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <CustomButton onClick={handleConfirmClick}>
            Confirm and Go to Dashboard
          </CustomButton>
          <CustomButton
            variant="secondary"
            onClick={() => setOpenImportModal(true)}
          >
            Import Another Sheet
          </CustomButton>
        </Flex>
      </Modal>
    </div>
  );
}
