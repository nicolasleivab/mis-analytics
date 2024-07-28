import React, { useCallback, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import ExcelJS from "exceljs";
import Papa from "papaparse";

interface ExcelDropzoneProps {
  onFileDrop: (file: File) => void;
  handleParse: (data: any[][]) => void;
  file: File | null;
}

const ExcelDropzone: React.FC<ExcelDropzoneProps> = ({
  onFileDrop,
  handleParse,
  file,
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [dropMsg, setDropMsg] = React.useState<string>(
    "Drag and drop a file here, or click to select a file"
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileDrop(acceptedFiles[0]);
    },
    [onFileDrop]
  );

  useEffect(() => {
    if (!file) return;

    const handleFileParse = async () => {
      if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const csvData = Papa.parse(event.target.result, {
            header: false,
          }).data as any[][];

          handleParse(csvData);
        };
        reader.readAsText(file);
      } else {
        const reader = new FileReader();
        reader.onload = async (event: any) => {
          const buffer = event.target.result;
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer);
          const worksheet = workbook.worksheets[0];
          const jsonData = worksheetToArray(worksheet);
          handleParse(jsonData);
        };
        reader.readAsArrayBuffer(file);
      }
    };

    try {
      handleFileParse();
      setDropMsg(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error));
    }
  }, [file, handleParse]);

  const worksheetToArray = (worksheet: ExcelJS.Worksheet) => {
    const data: any[][] = [];
    worksheet.eachRow((row, rowNumber) => {
      const rowData: any[] = [];
      row.eachCell((cell, colNumber) => {
        rowData[colNumber - 1] = cell.value;
      });
      data[rowNumber - 1] = rowData;
    });
    return data;
  };

  const acceptedFileTypes: Accept = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "text/csv": [".csv"],
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #007bff",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>{error ? error : dropMsg}</p>
    </div>
  );
};

export default ExcelDropzone;
