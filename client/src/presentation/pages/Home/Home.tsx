import * as styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useExcelContext } from '../../../application/context/Excel/ExcelProvider';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { useState, useMemo } from 'react';
import { BODY_PARTS } from '../../components/BodyViz/body-parts';
import { Flex } from '../../layout';
import { Button } from '../../components';

const uniqueBodyParts = [...new Set(BODY_PARTS.map((item) => item.name))];

export const EXTRA_FIELDS = [
  { name: 'id', example: '001' },
  { name: 'name', example: 'John Doe' },
  { name: 'sex', example: 'M' },
  { name: 'height', example: '181' },
  { name: 'weight', example: '120' },
  { name: 'age', example: '25' },
];

export const FIELDS: any[] = [
  ...uniqueBodyParts.map((name) => ({ name: `${name} score` })),
  ...EXTRA_FIELDS,
];

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setExcelData } = useExcelContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImportClick = (parsedData: any[][]) => {
    setExcelData(parsedData);
    navigate('/dashboard');
  };

  const fields = useMemo(
    () =>
      FIELDS.map((field) => ({
        label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
        key: field.name,
        fieldType: {
          type: 'input',
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        example: field.example ?? '0.76',
        // validations: [
        //   {
        //     rule: "required",
        //     errorMessage: `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`,
        //     level: "error",
        //   },
        // ],
      })),
    []
  );

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
        <Button onClick={() => setOpenModal(true)}>Import Excel</Button>
      </Flex>
      <ReactSpreadsheetImport
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const typedData = data?.validData as unknown as any[][];
          handleImportClick(typedData);
        }}
        fields={fields}
      />
    </div>
  );
}
