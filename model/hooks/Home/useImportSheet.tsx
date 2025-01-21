import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  TExcelData,
  setExcelData,
  useAppSelector,
  selectAllVariableFields,
} from '../..';
import { DASHBOARD_ROUTE } from '../../../application/controller/Router/routes';
import { TExcelSheetData } from '../../Excel/definitions';

/**
 * Manages the flow for importing Excel sheets, naming them,
 * storing them, and navigating to the dashboard.
 */
export default function useImportSheet() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const varialbleFields = useAppSelector(selectAllVariableFields);

  // Modal states
  const [openModal, setOpenImportModal] = useState<boolean>(false);
  const [openNameModal, setOpenNameModal] = useState<boolean>(false);
  const [openActionModal, setOpenActionModal] = useState<boolean>(false);

  // Data states
  const [importedSheets, setImportedSheets] = useState<TExcelData>([]);
  const [parsedData, setParsedData] = useState<TExcelSheetData>([]);

  // Misc. states
  const [customSheetName, setCustomSheetName] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  /**
   * Triggered after receiving validated data from the spreadsheet import step.
   */
  const handleImportClick = (data: TExcelSheetData) => {
    setParsedData(data);
    setOpenActionModal(false);
    setOpenNameModal(true);
  };

  /**
   * Triggered after user types a custom name for the newly imported sheet.
   */
  const handleSaveSheetName = () => {
    if (customSheetName.trim() === '') {
      setShowAlert(true);
      return;
    }

    // check filters from variableFields
    const filtersByIsFilterProp = varialbleFields.filter(
      (field) => field.isFilter
    );

    const currentFilters = filtersByIsFilterProp.map((field) => {
      return {
        name: field.name,
        type: field.type,
        values:
          field.type === 'category'
            ? [
                ...new Set(
                  parsedData.map((e) => e[field.name as keyof typeof e])
                ),
              ]
            : undefined,
        range:
          field.type === 'numeric'
            ? [
                Math.min(
                  ...parsedData
                    .map((e) => e[field.name as keyof typeof e])
                    .filter(
                      (value): value is number => typeof value === 'number'
                    )
                ),
                Math.max(
                  ...parsedData.map(
                    (e) => e[field.name as keyof typeof e] as number
                  )
                ),
              ]
            : undefined,
      };
    });

    // Append the new sheet
    const currentSheets = [
      ...importedSheets,
      { name: customSheetName, data: parsedData, filters: currentFilters },
    ] as TExcelData;

    setImportedSheets(currentSheets);

    // Reset states
    setCustomSheetName('');
    setOpenNameModal(false);
    setShowAlert(false);

    // Show post-import action modal
    setOpenActionModal(true);
  };

  /**
   * Saves all imported sheets to Redux and navigates to the dashboard.
   */
  const handleConfirmClick = () => {
    dispatch(setExcelData(importedSheets));
    navigate(DASHBOARD_ROUTE);
  };

  return {
    // State for controlling modals
    openModal,
    setOpenImportModal,
    openNameModal,
    setOpenNameModal,
    openActionModal,
    setOpenActionModal,

    // Data states
    importedSheets,
    setImportedSheets,
    parsedData,
    setParsedData,

    // Sheet-naming
    customSheetName,
    setCustomSheetName,

    // Alerts
    showAlert,
    setShowAlert,

    // Handlers
    handleImportClick,
    handleSaveSheetName,
    handleConfirmClick,
  };
}
