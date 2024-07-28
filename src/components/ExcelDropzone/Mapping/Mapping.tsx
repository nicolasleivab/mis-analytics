import React, { useCallback } from "react";
import * as styles from "./Mapping.module.css";
import { BODY_PARTS } from "../../BodyViz/body-parts";
import { FIELDS } from "./fields";
import { Flex } from "../../../layout";

interface MappingComponentProps {
  headers: string[];
  mapping: { [key: string]: string };
  setMapping: (mapping: { [key: string]: string }) => void;
}

const MappingComponent: React.FC<MappingComponentProps> = ({
  headers,
  mapping,
  setMapping,
}) => {
  const handleMappingChange = useCallback(
    (bodyPart: string, event: React.ChangeEvent<HTMLSelectElement>) => {
      setMapping({ ...mapping, [bodyPart]: event.target.value });
    },
    [mapping, setMapping]
  );

  return (
    <Flex>
      <Flex direction="column" gap="10px">
        {BODY_PARTS.map((part) => (
          <Flex key={part.name} width="300px">
            <label className={styles.Label}>{part.name}</label>
            <select
              value={mapping[part.name] || ""}
              onChange={(e) => handleMappingChange(part.name, e)}
              className={styles.Select}
            >
              <option value="">None</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </Flex>
        ))}
      </Flex>
      <Flex direction="column" gap="10px">
        {FIELDS.map((part) => (
          <Flex key={part.name} width="300px">
            <label className={styles.Label}>{part.name}</label>
            <select
              value={mapping[part.name] || ""}
              onChange={(e) => handleMappingChange(part.name, e)}
              className={styles.Select}
            >
              <option value="">None</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default MappingComponent;
