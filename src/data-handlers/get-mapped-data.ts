import { BODY_PARTS } from "../components/BodyViz/body-parts";
import { FIELDS } from "../components/ExcelDropzone/Mapping/fields";

export type TGetMappedData = {
  parsedData: string[][];
  headers: string[];
  mapping: { [key: string]: string };
};

export function getMappedData({
  parsedData,
  headers,
  mapping,
}: TGetMappedData) {
  const mappedData = parsedData.map((row) => {
    const dataObject: any = {};
    const bodyPartsMap: any[] = [];
    const stats: any[] = [];

    for (const [key, value] of Object.entries(mapping)) {
      if (value) {
        const headerIndex = headers.indexOf(value);
        const cellValue = row[headerIndex];

        if (FIELDS.map((field) => field.name).includes(key)) {
          dataObject[key] = cellValue;
        } else if (BODY_PARTS.some((part) => part.name === key)) {
          bodyPartsMap.push({
            [key]: [{ id: key, label: value, value: cellValue }],
          });
        } else {
          stats.push({ id: key, label: value, value: cellValue });
        }
      }
    }

    dataObject.bodyPartsMap = bodyPartsMap;
    dataObject.stats = stats;
    return dataObject;
  });

  return mappedData;
}
