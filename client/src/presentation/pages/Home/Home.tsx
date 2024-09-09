import * as styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import {
  TExcelData,
  useExcelContext,
} from '../../../application/context/Excel/ExcelProvider';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { useState } from 'react';
import { Flex } from '../../layout';
import { Button, Group, Modal, Text } from '@mantine/core';
import useImportFields from '../../../application/hooks/useImportFields';

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenImportModal] = useState<boolean>(false);
  const [openActionModal, setOpenActionModal] = useState<boolean>(false);
  const [importedSheets, setImportedSheets] = useState<TExcelData>([]);
  const { setExcelData } = useExcelContext();

  const { importFields: fields } = useImportFields();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImportClick = (parsedData: any[][], sheetName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
    setImportedSheets([
      ...importedSheets,
      { name: sheetName, data: parsedData },
    ]);
    setOpenActionModal(true); // Show action modal with two options
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
      <ReactSpreadsheetImport
        isOpen={openModal}
        onClose={() => setOpenImportModal(false)}
        onSubmit={(data, { name: sheetName }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const typedData = data?.validData as unknown as any[][];
          handleImportClick(typedData, sheetName);
        }}
        fields={fields}
      />
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
