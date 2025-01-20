import { useState, useEffect } from 'react';
import { Modal, Button, FileInput, Select, Alert } from '@mantine/core';
import Papa, { ParseResult } from 'papaparse';
import ExcelJS, { CellValue } from 'exceljs';
import {
  selectUniqueSvgParts,
  setIdField,
  useAppDispatch,
  useAppSelector,
} from '../../../model';

/** Possible “types” the user can assign to a column. */
type TColumnType = 'numeric' | 'category' | 'id';

/** Defines a single column’s name and user-selected type. */
type IColumnDef = {
  name: string;
  type: TColumnType;
};

/**
 * Props for the CustomExcelTypeModal component:
 * - file: The initial File if provided (can be null).
 * - isOpen: Whether the modal is visible.
 * - onClose: Handler to close the modal.
 * - onFileSelected: Called when the user picks a file from FileInput.
 * - onConfirm: Called when the user confirms their column type selections.
 */
type CustomExcelTypeModalProps = {
  file: File | null;
  isOpen: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
  onConfirm: (finalVariableFields: IColumnDef[]) => void;
  modalOffset: number;
};

/**
 * Utility function that:
 * 1) Detects file extension.
 * 2) If CSV, reads as text.
 * 3) If XLS/XLSX, converts the first worksheet to CSV via exceljs.
 */
async function parseFileToCsv(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'csv') {
    // Already CSV => return file contents as text
    return await file.text();
  }

  if (extension === 'xlsx' || extension === 'xls') {
    // Convert Excel -> CSV using exceljs
    const arrayBuffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new Error('No worksheet found in the Excel file.');
    }
    return convertWorksheetToCsv(worksheet);
  }

  throw new Error('Unsupported file format. Please provide CSV, XLS, or XLSX.');
}

/**
 * Convert an exceljs Worksheet into CSV text line-by-line.
 */
function convertWorksheetToCsv(worksheet: ExcelJS.Worksheet): string {
  const lines: string[] = [];

  worksheet.eachRow((row: ExcelJS.Row) => {
    // row.values can be "undefined | any[] | { [index: number]: CellValue }"
    const { values } = row;
    // We only handle the case where values is an array:
    if (!values || !Array.isArray(values)) {
      return; // or handle differently if you'd like
    }

    // row.values is 1-based, so skip index 0
    const rowData = values.slice(1).map((cellVal: CellValue) => {
      if (cellVal == null) {
        // cellVal could be null or undefined
        return '';
      }
      // Convert to string, escaping quotes
      const str = String(cellVal).replace(/"/g, '""');
      // Wrap in quotes for CSV
      return `"${str}"`;
    });

    lines.push(rowData.join(','));
  });

  return lines.join('\n');
}

export default function CustomExcelTypeModal({
  file,
  isOpen,
  onClose,
  onFileSelected,
  onConfirm,
  modalOffset,
}: CustomExcelTypeModalProps) {
  const dispatch = useAppDispatch();
  const uniqueSvgParts = useAppSelector(selectUniqueSvgParts);
  // Local file selected by user (could come from props or from user input).
  const [localFile, setLocalFile] = useState<File | null>(file);

  /** The list of header definitions (e.g. "age", "patientId", etc.). */
  const [headers, setHeaders] = useState<string[]>([]);

  /** Holds the inferred or user-selected type for each header. */
  const [columnTypes, setColumnTypes] = useState<IColumnDef[]>([]);

  /** Error message if the user tries to confirm with an invalid ID selection. */
  const [idError, setIdError] = useState<string | null>(null);

  /** When the user picks a file from FileInput. */
  const handleFilePick = (f: File) => {
    setLocalFile(f);
    onFileSelected(f); // notify parent
  };

  const onCloseHandler = () => {
    setLocalFile(null);
    setIdError(null);
    onClose();
  };

  /**
   * Whenever localFile changes, parse the file:
   * 1) Convert XLS/XLSX -> CSV if needed
   * 2) Use Papa Parse (with preview=20) to detect headers & sample rows
   * 3) Infer naive types (numeric vs category, or 'id' if header includes 'id')
   */
  useEffect(() => {
    if (!localFile) return;

    async function parse() {
      try {
        const csvText = await parseFileToCsv(localFile!);

        // Now parse partial CSV (20 rows) to get headers & sample data
        Papa.parse<Record<string, unknown>>(csvText, {
          preview: 20,
          header: true,
          complete: (results: ParseResult<Record<string, unknown>>) => {
            if (results.meta.fields) {
              const foundHeaders = results.meta.fields;
              setHeaders(foundHeaders);

              const rowData = results.data;

              // Infer column types
              const guessed: IColumnDef[] = foundHeaders.map((header) => {
                const lowerHeader = header.toLowerCase();

                // If column name has 'id' anywhere => guess 'id'
                if (lowerHeader.includes('id')) {
                  dispatch(setIdField(header));
                  return { name: header, type: 'id' };
                }

                // Otherwise check sample values => numeric or category
                const sampleValues = rowData
                  .map((row) => row[header])
                  .filter((val) => val != null && val !== '');

                const allNumbers = sampleValues.every(
                  (val) => !isNaN(Number(val))
                );

                return {
                  name: header,
                  type: allNumbers ? 'numeric' : 'category',
                };
              });

              setColumnTypes(guessed);
              setIdError(null);
            }
          },
        });
      } catch (error) {
        console.error('Error parsing file:', error);
      }
    }

    parse().catch((error) => console.error('Error parsing file:', error));
  }, [localFile]);

  /**
   * If the user overrides a column's type with the <Select />,
   * update that in our columnTypes state.
   */
  const handleTypeChange = (headerName: string, newType: TColumnType) => {
    setColumnTypes((prev) =>
      prev.map((col) =>
        col.name === headerName ? { ...col, type: newType } : col
      )
    );
    // Clear error if they change selection
    setIdError(null);
  };

  /**
   * On final confirm, ensure EXACTLY one column is 'id'.
   * If not, show an error and block confirmation.
   */
  const handleConfirm = () => {
    const countId = columnTypes.filter((col) => col.type === 'id').length;
    if (countId !== 1) {
      setIdError('Please ensure exactly one column is designated as ID.');
      return;
    }

    const areAllSvgPartsIncluded = uniqueSvgParts.every((part) =>
      columnTypes.some((col) => col.name.toLowerCase() === part.toLowerCase())
    );

    const listOfMissingSvgParts = uniqueSvgParts.filter(
      (part) =>
        !columnTypes.some(
          (col) => col.name.toLowerCase() === part.toLowerCase()
        )
    );

    if (!areAllSvgPartsIncluded) {
      setIdError(
        'Please ensure the excel headers match the ids in the svg json, the mismatching parts are: ' +
          listOfMissingSvgParts.join(', ')
      );
      return;
    }

    // No error => proceed
    setIdError(null);

    onConfirm(columnTypes);
  };

  return (
    <Modal
      yOffset={modalOffset}
      opened={isOpen}
      onClose={onCloseHandler}
      title="Select file and review column types"
    >
      {/* If user hasn't selected a file yet, show a FileInput */}
      {!localFile && (
        <FileInput
          label="Choose Excel/CSV File"
          placeholder="Click to upload"
          accept=".csv, .xlsx, .xls"
          onChange={(f) => f && handleFilePick(f)}
        />
      )}

      {/* If a file is selected, show its name and the inferred columns */}
      {localFile && (
        <>
          <p>File: {localFile.name}</p>

          {headers.length > 0 ? (
            <>
              {idError && (
                <Alert color="red" variant="filled" mb="sm">
                  {idError}
                </Alert>
              )}

              {headers.map((hdr) => {
                const current = columnTypes.find((c) => c.name === hdr);
                return (
                  <div
                    key={hdr}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      marginBottom: '8px',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ flex: '1 1 auto' }}>{hdr}</span>
                    <Select
                      value={current?.type}
                      onChange={(val) =>
                        handleTypeChange(hdr, val as TColumnType)
                      }
                      data={[
                        { label: 'Numeric', value: 'numeric' },
                        { label: 'Category', value: 'category' },
                        { label: 'Id', value: 'id' },
                      ]}
                    />
                  </div>
                );
              })}

              <Button
                onClick={handleConfirm}
                disabled={headers.length === 0}
                mt="md"
              >
                Confirm
              </Button>
            </>
          ) : (
            <p>Parsing file headers...</p>
          )}
        </>
      )}
    </Modal>
  );
}
