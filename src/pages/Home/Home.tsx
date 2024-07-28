import * as styles from "./Home.module.css";
import { Button, Input, StepsSlider } from "../../components";
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

  const importSteps = [
    {
      title: "Upload your file",
      description: "",
      children: (
        <ExcelDropzone
          onFileDrop={handleFileDrop}
          handleParse={handleParse}
          file={file}
        />
      ),
    },
    {
      title: "Delimit your data",
      description:
        "Delimit the columns and rows you want to use from your file",
      children: (
        <div>
          <Input
            label="Columns up to:"
            inputType="number"
            value={maxColumns ?? ""}
            onChange={(e) =>
              setMaxColumns(e.target.value ? parseInt(e.target.value) : null)
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
      ),
    },
    {
      title: "Map your data",
      description: "Map your column values to the fields of the visualization",
      children: (
        <MappingComponent
          headers={headers}
          mapping={mapping}
          setMapping={setMapping}
        />
      ),
    },
    {
      title: "Import your data",
      description: "",
      children: (
        <Button
          onClick={handleImportClick}
          buttonType={checkEmptyObject(mapping) ? "disabled" : "primary"}
        >
          {getButtonLabel({ isParsing, parsedData })}
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.Home}>
      <Flex>
        <StepsSlider steps={importSteps} />
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
