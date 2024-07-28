import { useState, useCallback } from "react";

const useFileParsing = () => {
  const [maxColumns, setMaxColumns] = useState<number | null>(null);
  const [maxRows, setMaxRows] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [mapping, setMapping] = useState<{ [key: string]: string }>({});

  const handleFileDrop = useCallback((droppedFile: File) => {
    setFile(droppedFile);
  }, []);

  const handleParse = useCallback(
    (data: any[][]) => {
      setIsParsing(true);
      if (data.length > 0) {
        setHeaders(data[0]);
        const filteredData = data.slice(1); // Remove headers row
        let processedData = filteredData;
        if (maxRows !== null) {
          processedData = processedData.slice(0, maxRows);
        }
        if (maxColumns !== null) {
          processedData = processedData.map((row) => row.slice(0, maxColumns));
        }
        setParsedData(processedData);
      }
      setIsParsing(false);
    },
    [maxColumns, maxRows]
  );

  return {
    maxColumns,
    setMaxColumns,
    maxRows,
    setMaxRows,
    file,
    handleFileDrop,
    handleParse,
    parsedData,
    headers,
    isParsing,
    mapping,
    setMapping,
  };
};

export default useFileParsing;
