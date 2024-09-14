import * as styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import {
  TExcelData,
  useExcelContext,
} from '../../../application/context/Excel/ExcelProvider';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { useState } from 'react';
import { Flex } from '../../layout';
import { Button, Group, Modal, Text, TextInput } from '@mantine/core';
import useImportFields from '../../../application/hooks/useImportFields';

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenImportModal] = useState<boolean>(false);
  const [openNameModal, setOpenNameModal] = useState<boolean>(false); // Modal for naming the sheet
  const [openActionModal, setOpenActionModal] = useState<boolean>(false); // Modal for confirm/import another
  const [customSheetName, setCustomSheetName] = useState<string>(''); // Custom sheet name state
  const [importedSheets, setImportedSheets] = useState<TExcelData>([]);
  const [parsedData, setParsedData] = useState<any[][]>([]); // Store the imported data temporarily
  const { setExcelData } = useExcelContext();

  const { importFields: fields } = useImportFields();

  // Triggered after importing the sheet
  const handleImportClick = (data: any[][]) => {
    setParsedData(data); // Save the parsed data temporarily
    setOpenNameModal(true); // Open modal to name the sheet
  };

  // Triggered after naming the sheet
  const handleSaveSheetName = () => {
    if (customSheetName.trim() === '') {
      alert('Please provide a valid sheet name.');
      return;
    }

    setImportedSheets([
      ...importedSheets,
      { name: customSheetName, data: parsedData }, // Use the custom name and saved data
    ]);
    setCustomSheetName(''); // Clear the input after saving the sheet
    setOpenNameModal(false); // Close the name modal
    setOpenActionModal(true); // Open the action modal
  };

  const handleConfirmClick = () => {
    setExcelData(importedSheets);
    navigate('/dashboard');
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
        <Button onClick={() => setOpenImportModal(true)}>Import Excel</Button>
      </Flex>

      {/* Import Modal */}
      <ReactSpreadsheetImport
        isOpen={openModal}
        onClose={() => setOpenImportModal(false)}
        onSubmit={(data) => {
          const typedData = data?.validData as unknown as any[][];
          handleImportClick(typedData);
          setOpenImportModal(false);
        }}
        fields={fields}
      />

      {/* Sheet Naming Modal */}
      <Modal
        opened={openNameModal}
        onClose={() => setOpenNameModal(false)}
        title="Name your sheet"
      >
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
