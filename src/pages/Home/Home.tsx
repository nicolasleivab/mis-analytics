import * as styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useExcelContext } from "../../context/Excel/ExcelProvider";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { useState, useMemo } from "react";
import { BODY_PARTS } from "../../components/BodyViz/body-parts";
import { Flex } from "../../layout";
import { Button } from "../../components";


const uniqueBodyParts = [...new Set(BODY_PARTS.map((item) => item.name))];

export const FIELDS: any[] = [
  ...uniqueBodyParts.map((name) => ({ name: `${name} score` })),
  { name: "id", example: "001" },
  { name: "name", example: "John Doe" },
  { name: "sex", example: "M"},
  { name: "height", example: "181" },
  { name: "weight", example: "120" },
  { name: "age", example: "25" },
];

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setExcelData } = useExcelContext();

  const handleImportClick = () => {
    // setExcelData('excelData');
    navigate("/dashboard");
  };

  const fields = useMemo(
    () =>
      FIELDS.map((field) => ({
        label: field.name.charAt(0).toUpperCase() + field.name.slice(1),
        key: field.name,
        fieldType: {
          type: "input",
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        example: field.example ?? "0.76",
        validations: [
          {
            rule: "required",
            errorMessage: `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`,
            level: "error",
          },
        ],
      })),
    []
  );

  return (
    <div className={styles.Home}>
      <Flex>
         <Button onClick={() => setOpenModal(true)}>Import Excel</Button>
      </Flex>
      <ReactSpreadsheetImport
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => {
          console.log('submit', data);
          // const typedData = data as any[][];
          // setExcelData(typedData);
          navigate("/dashboard");
        }}
        fields={fields}
      />
    </div>
  );
}
