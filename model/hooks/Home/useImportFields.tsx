import { useEffect, useMemo, useState } from 'react';
import { TField } from '../../definitions/ImportFields';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  // selectUniqueSvgParts,
  selectSvgError,
  selectSvgLoading,
} from '../../Project/projectSelectors';
import { setVariableFields as setVariableFieldsRedux } from '../../Project/projectSlice';
import { TVariableField } from '../../Project/definitions';

export default function useImportFields(
  setOpenImportModal: React.Dispatch<React.SetStateAction<boolean>>
) {
  const dispatch = useAppDispatch();
  // const reduxUniqueParts = useAppSelector(selectUniqueSvgParts);
  const loading = useAppSelector(selectSvgLoading);
  const error = useAppSelector(selectSvgError);

  const [variableFields, setVariableFields] = useState<TVariableField[]>([]);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);

  // Build your raw fields
  const rawFields: TField[] = useMemo(
    () => [
      // ...reduxUniqueParts.map((name): TField => ({ name })), TODO: Add description requirements excel headers must match id in svg json
      ...variableFields,
    ],
    [variableFields]
  );

  const importFields = useMemo(
    () =>
      rawFields.map((field) => ({
        label: field.name,
        key: field.name,
        fieldType: { type: 'input' },
        example: field.example ?? '0.76',
      })),
    [rawFields]
  );

  // triggered by "Upload Excel" button
  const handleOpenExcelTypeModal = (file: File) => {
    setExcelFile(file);
    setTypeModalOpen(true);
  };

  // after user finalizes column types in "CustomExcelTypeModal"
  const handleTypeConfirm = (finalVariableFields: TVariableField[]) => {
    // stash them in your store or local state so useImportFields can build final fields
    setVariableFields(finalVariableFields);
    setTypeModalOpen(false);

    // open the react-spreadsheet-import wizard
    setOpenImportModal(true);
  };

  useEffect(() => {
    if (variableFields.length > 0) {
      dispatch(setVariableFieldsRedux(variableFields));
    }
  }, [variableFields, dispatch]);

  return {
    importFields,
    rawFields,
    loading,
    error,
    setVariableFields,
    handleOpenExcelTypeModal,
    handleTypeConfirm,
    isTypeModalOpen,
    setTypeModalOpen,
    excelFile,
  };
}
