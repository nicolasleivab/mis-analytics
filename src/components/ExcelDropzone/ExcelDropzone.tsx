import React, { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import ExcelJS from "exceljs";
import Papa from "papaparse";

interface ExcelDropzoneProps {
  onFileParsed: (data: any[][]) => void;
  columns?: number[];
  rows?: number[];
}

const ExcelDropzone: React.FC<ExcelDropzoneProps> = ({
  onFileParsed,
  columns,
  rows,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const csvData = Papa.parse(event.target.result, {
            header: false,
          }).data as any[][];

          processParsedData(csvData);
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
          processParsedData(jsonData);
        };
        reader.readAsArrayBuffer(file);
      }
    },
    [onFileParsed, columns, rows]
  );

  const processParsedData = (data: any[][]) => {
    let filteredData = data;
    if (rows) {
      filteredData = filteredData.filter((_, index) => rows.includes(index));
    }
    if (columns) {
      filteredData = filteredData.map((row) =>
        row.filter((_, index) => columns.includes(index))
      );
    }
    onFileParsed(filteredData);
  };

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
      }}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default ExcelDropzone;
