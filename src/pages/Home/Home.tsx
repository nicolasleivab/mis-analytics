import * as styles from "./Home.module.css";
import { Button, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { Flex } from "../../layout";
import ExcelDropzone from "../../components/ExcelDropzone/ExcelDropzone";
import { useExcelContext } from "../../context/Excel/ExcelProvider";
import useFileParsing from "../../hooks/useFileParsing";
import MappingComponent from "../../components/ExcelDropzone/Mapping/Mapping";
import { getMappedData } from "../../data-handlers";

export default function Home() {
  const navigate = useNavigate();
  const { setExcelData } = useExcelContext();
  const {
    maxColumns,
    setMaxColumns,
    maxRows,
    setMaxRows,
    file,
    handleFileDrop,
    handleParse,
    parsedData,
    isParsing,
    headers,
    mapping,
    setMapping,
  } = useFileParsing();

  const handleImportClick = () => {
    if (!isParsing) {
      const finalData = getMappedData({ parsedData, headers, mapping });

      setExcelData(finalData);
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.Home}>
      <Flex>
        <Flex direction="column" gap="20px">
          <ExcelDropzone
            onFileDrop={handleFileDrop}
            handleParse={handleParse}
            file={file}
          />
          {file && (
            <div>
              <Input
                label="Columns up to:"
                inputType="number"
                value={maxColumns ?? ""}
                onChange={(e) =>
                  setMaxColumns(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
              <Input
                label="Rows up to:"
                inputType="number"
                value={maxRows ?? ""}
                onChange={(e) =>
                  setMaxRows(e.target.value ? parseInt(e.target.value) : null)
                }
              />
            </div>
          )}
          {Number(maxRows) > 0 && Number(maxColumns) > 0 ? (
            <MappingComponent
              headers={headers}
              mapping={mapping}
              setMapping={setMapping}
            />
          ) : null}

          <Button
            onClick={handleImportClick}
            buttonType={checkEmptyObject(mapping) ? "disabled" : "primary"}
          >
            {getButtonLabel({ isParsing, parsedData })}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

function getButtonLabel({
  isParsing,
  parsedData,
}: {
  isParsing: boolean;
  parsedData: any[][];
}) {
  if (parsedData.length === 0) {
    return "Drop a file";
  }

  return isParsing ? "Parsing..." : "Import csv";
}

function checkEmptyObject(obj: any) {
  return Object.keys(obj).length === 0;
}
