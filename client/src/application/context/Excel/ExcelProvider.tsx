// disable all ts eslint rule for this file and ts errors
// disable ts checks for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface ExcelContextProps {
  excelData: any[][];
  setExcelData: React.Dispatch<React.SetStateAction<any[][]>>;
}

const ExcelContext = createContext<ExcelContextProps | undefined>(undefined);

export const ExcelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [excelData, setExcelData] = useState<any[][]>(() => {
    // Load initial data from local storage
    const savedData = localStorage.getItem('excelData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    // Save excel data to local storage whenever it updates
    localStorage.setItem('excelData', JSON.stringify(excelData));
  }, [excelData]);

  return (
    <ExcelContext.Provider value={{ excelData, setExcelData }}>
      {children}
    </ExcelContext.Provider>
  );
};

export const useExcelContext = () => {
  const context = useContext(ExcelContext);
  if (!context) {
    throw new Error('useExcelContext must be used within an ExcelProvider');
  }
  return context;
};
