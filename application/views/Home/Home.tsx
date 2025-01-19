import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { Flex } from '../../../presentation/layout';
import {
  Button,
  Group,
  Modal,
  Text,
  TextInput,
  Alert,
  FileInput,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react'; // Import Mantine icon
import {
  useImportFields,
  TExcelData,
  useSvgUpload,
  useImportSheet,
} from '../../../model';
import * as styles from './Home.module.css';

const MODAL_OFFSET = 150;

export default function Home() {
  const {
    openModal,
    setOpenImportModal,
    openNameModal,
    setOpenNameModal,
    openActionModal,
    setOpenActionModal,
    customSheetName,
    setCustomSheetName,
    // showAlert: showSheetAlert,
    // setShowAlert: setShowSheetShowAlert,
    handleImportClick,
    handleSaveSheetName,
    handleConfirmClick,
    importedSheets,
  } = useImportSheet();

  const {
    setSvgPartsFile,

    setClipPathsFile,
    showAlert,
    setShowAlert,
    openSvgModal,
    setOpenSvgModal,
    handleSvgPartsSubmit,
    handleUseDefaultSvg,
  } = useSvgUpload(setOpenImportModal);

  const { importFields: fields } = useImportFields();

  return (
    <div className={styles.Home}>
      <Flex gap="20px" padding="50px" direction="column">
        <div className={styles.HomeText}>
          <h1>Welcome to MIS Analytics</h1>
          <p>
            This tool is designed to help you analyze and compare different
            machine learning models for medical image segmentation. By
            evaluating these models, you can make data-driven decisions that
            enhance the accuracy and efficiency of medical image analysis.
          </p>
          <p>
            To get started, please select an XLS, XLSX, or CSV file containing
            your model results. Follow the import and data validation steps to
            properly import and parse your data into the system.
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
      <Flex>
        <Button onClick={() => setOpenSvgModal(true)}>Import Excel</Button>
      </Flex>

      {/* SVG Parts Modal */}
      <Modal
        yOffset={MODAL_OFFSET}
        opened={openSvgModal}
        onClose={() => setOpenSvgModal(false)}
        title="Upload SVG JSON Files for the Visualization"
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
        <Group mt="xl">
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Button onClick={handleSvgPartsSubmit}>Upload</Button>
          <Button variant="outline" onClick={handleUseDefaultSvg}>
            Use Default SVG
          </Button>
        </Group>
      </Modal>

      {/* Import Modal */}
      <ReactSpreadsheetImport
        isOpen={openModal}
        onClose={() => setOpenImportModal(false)}
        onSubmit={(data) => {
          const typedData = data?.validData as unknown as TExcelData;
          handleImportClick(typedData);
          setOpenImportModal(false); // Close import modal after submission
        }}
        fields={fields}
      />

      {/* Sheet Naming Modal */}
      <Modal
        yOffset={MODAL_OFFSET}
        opened={openNameModal}
        onClose={() => setOpenNameModal(false)}
        title="Name your sheet"
      >
        {/* Display the alert if no sheet name is entered */}
        {showAlert && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error!"
            color="red"
            withCloseButton
            onClose={() => setShowAlert(false)}
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
        <Group mt="xl">
          <Button onClick={handleSaveSheetName}>Save and Continue</Button>
        </Group>
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
        <Group mt="xl">
          <Button onClick={handleConfirmClick}>
            Confirm and Go to Dashboard
          </Button>
          <Button variant="outline" onClick={() => setOpenImportModal(true)}>
            Import Another Sheet
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
