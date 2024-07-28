import * as styles from "./Home.module.css";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { Flex } from "../../layout";
import ExcelDropzone from "../../components/ExcelDropzone/ExcelDropzone";
import { useExcelContext } from "../../context/Excel/ExcelProvider";
import useFileParsing from "../../hooks/useFileParsing"; // Adjust the path as needed

export default function Home() {
  const navigate = useNavigate();
  const { setExcelData, excelData } = useExcelContext();
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
  } = useFileParsing();

  const handleImportClick = () => {
    if (!isParsing) {
      setExcelData(parsedData);
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
              <div>
                <label>
                  Columns up to:
                  <input
                    type="number"
                    value={maxColumns ?? ""}
                    onChange={(e) =>
                      setMaxColumns(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Rows up to:
                  <input
                    type="number"
                    value={maxRows ?? ""}
                    onChange={(e) =>
                      setMaxRows(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                  />
                </label>
              </div>
            </div>
          )}
          <Button
            onClick={handleImportClick}
            buttonType={isParsing ? "disabled" : "primary"}
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
