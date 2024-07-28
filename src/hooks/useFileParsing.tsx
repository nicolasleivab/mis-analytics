import { useState } from "react";

const useFileParsing = () => {
  const [maxColumns, setMaxColumns] = useState<number | null>(null);
  const [maxRows, setMaxRows] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[][]>([]);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileDrop = (droppedFile: File) => {
    setFile(droppedFile);
  };

  const handleParse = (data: any[][]) => {
    setIsParsing(true);
    let filteredData = data;
    if (maxRows !== null) {
      filteredData = filteredData.slice(0, maxRows);
    }
    if (maxColumns !== null) {
      filteredData = filteredData.map((row) => row.slice(0, maxColumns));
    }
    setParsedData(filteredData);
    setIsParsing(false);
  };

  return {
    maxColumns,
    setMaxColumns,
    maxRows,
    setMaxRows,
    file,
    handleFileDrop,
    handleParse,
    parsedData,
    isParsing,
  };
};

export default useFileParsing;
