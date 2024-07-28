import * as styles from "./Home.module.css";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { Flex } from "../../layout";
import ExcelDropzone from "../../components/ExcelDropzone/ExcelDropzone";
import { useExcelContext } from "../../context/Excel/ExcelProvider";

export default function Home() {
  const navigate = useNavigate();
  const { setExcelData } = useExcelContext();

  const handleFileParsed = (data: any[][]) => {
    setExcelData(data);
  };

  return (
    <div className={styles.Home}>
      <Flex>
        <Flex direction="column" gap="20px">
          <ExcelDropzone
            onFileParsed={handleFileParsed}
            columns={[0, 1, 2]}
            rows={[0, 1, 2, 3]}
          />
          <Button onClick={() => navigate("/dashboard")}>Import csv</Button>
        </Flex>
      </Flex>
    </div>
  );
}
