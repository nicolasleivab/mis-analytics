export interface TGetMappedData {
  parsedData: string[][];
  headers: string[];
  mapping: Record<string, string>;
}

export function getMappedData({
  parsedData,

}: TGetMappedData) {
  const mappedData = parsedData

  return mappedData;
}
