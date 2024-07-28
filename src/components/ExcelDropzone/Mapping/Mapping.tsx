import React, { useCallback } from "react";
import { BODY_PARTS } from "../../BodyViz/body-parts";
import { FIELDS } from "./fields";
import { Flex } from "../../../layout";
import { Dropdown } from "../../index";

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
    (bodyPart: string, value: string) => {
      setMapping({ ...mapping, [bodyPart]: value });
    },
    [mapping, setMapping]
  );

  const uniqueBodyParts = [...new Set(BODY_PARTS.map((item) => item.name))];

  return (
    <Flex>
      <Flex direction="column" gap="10px">
        {uniqueBodyParts.map((part) => (
          <Flex key={part} width="300px">
            <Dropdown
              label={part}
              options={headers.map((header) => ({
                value: header,
                label: header,
              }))}
              value={mapping[part] || ""}
              onChange={(id: string) => handleMappingChange(part, id)}
              placeholder="None"
            />
            {/* <label className={styles.Label}>{part}</label>
            <select
              value={mapping[part] || ""}
              onChange={(e) => handleMappingChange(part, e)}
              className={styles.Select}
            >
              <option value="">None</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select> */}
          </Flex>
        ))}
      </Flex>
      <Flex direction="column" gap="10px">
        {FIELDS.map((part) => (
          <Flex key={part.name} width="300px">
            <Dropdown
              label={part.name}
              options={headers.map((header) => ({
                value: header,
                label: header,
              }))}
              value={mapping[part.name] || ""}
              onChange={(id: string) => handleMappingChange(part.name, id)}
              placeholder="None"
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default MappingComponent;
