import * as styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { useState } from 'react';
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
import { useImportFields } from '../../../model/hooks';
import {
  useAppDispatch,
  TExcelData,
  setExcelData,
  // fetchSvgParts,
  setSvgParts,
  TSvgPart,
  TClipPath,
} from '../../../model';
import { DASHBOARD_ROUTE } from '../../controller/Router/routes';
import demoViz from '../../../services/api/SvgViz/demoViz.json';
import demoClipPaths from '../../../services/api/SvgViz/demoClipPaths.json';

const MODAL_OFFSET = 150;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchSvgParts()).catch((error) => {
  //     console.error('Failed to fetch SVG parts:', error);
  //   });
  // }, [dispatch]);

  const [openSvgModal, setOpenSvgModal] = useState<boolean>(false);
  const [openModal, setOpenImportModal] = useState<boolean>(false);
  const [openNameModal, setOpenNameModal] = useState<boolean>(false);
  const [openActionModal, setOpenActionModal] = useState<boolean>(false);
  const [customSheetName, setCustomSheetName] = useState<string>('');
  const [importedSheets, setImportedSheets] = useState<TExcelData>([]);
  const [parsedData, setParsedData] = useState<TExcelData>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [svgPartsFile, setSvgPartsFile] = useState<File | null>(null);
  const [clipPathsFile, setClipPathsFile] = useState<File | null>(null);

  const { importFields: fields } = useImportFields();

  // Triggered after importing the sheet
  const handleImportClick = (data: TExcelData) => {
    setParsedData(data); // Save the parsed data temporarily
    setOpenActionModal(false); // Ensure action modal is closed
    setOpenNameModal(true); // Open modal to name the sheet
  };

  // Triggered after naming the sheet
  const handleSaveSheetName = () => {
    if (customSheetName.trim() === '') {
      // Show alert if no sheet name is provided
      setShowAlert(true);
      return;
    }

    const currentSheets = [
      ...importedSheets,
      { name: customSheetName, data: parsedData }, // Use the custom name and saved data
    ] as TExcelData;

    setImportedSheets(currentSheets);

    // Reset the state after saving the sheet name
    setCustomSheetName(''); // Clear the input after saving the sheet
    setOpenNameModal(false); // Close the name modal
    setShowAlert(false); // Reset alert visibility
    setOpenActionModal(true); // Open the action modal
  };

  const handleConfirmClick = () => {
    dispatch(setExcelData(importedSheets));
    navigate(DASHBOARD_ROUTE);
  };

  const handleSvgPartsSubmit = async (): Promise<void> => {
    if (!svgPartsFile) {
      setShowAlert(true);
      return;
    }

    try {
      const svgPartsText = await svgPartsFile.text();
      const svgPartsJson: TSvgPart[] = JSON.parse(svgPartsText) as TSvgPart[];

      const clipPathsText = clipPathsFile ? await clipPathsFile.text() : '';
      const clipPathsJson: TClipPath[] = clipPathsFile
        ? (JSON.parse(clipPathsText) as TClipPath[])
        : [];

      dispatch(
        setSvgParts({ svgParts: svgPartsJson, clipPaths: clipPathsJson })
      );
      setOpenSvgModal(false);
      setOpenImportModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error parsing JSON files:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      setOpenSvgModal(false);
    }
  };

  const handleUseDefaultSvg = () => {
    dispatch(setSvgParts({ svgParts: demoViz, clipPaths: demoClipPaths }));
    setOpenSvgModal(false);
    setOpenImportModal(true);
  };

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
