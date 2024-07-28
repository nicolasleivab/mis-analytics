import React, { createContext, useState, useContext, ReactNode } from "react";

interface ExcelContextProps {
  excelData: any[][];
  setExcelData: React.Dispatch<React.SetStateAction<any[][]>>;
}

const ExcelContext = createContext<ExcelContextProps | undefined>(undefined);

export const ExcelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [excelData, setExcelData] = useState<any[][]>([]);

  return (
    <ExcelContext.Provider value={{ excelData, setExcelData }}>
      {children}
    </ExcelContext.Provider>
  );
};

export const useExcelContext = () => {
  const context = useContext(ExcelContext);
  if (!context) {
    throw new Error("useExcelContext must be used within an ExcelProvider");
  }
  return context;
};
