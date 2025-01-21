export type TVariableType = 'id' | 'numeric' | 'category';

export type TCategoricalValues = string[];

export type TNumericRange = [number, number];

export type TFilter = {
  name: string;
  type: TVariableType;
  values?: TCategoricalValues;
  range?: TNumericRange;
};

export type TPolymorphicRecord = Record<
  string | symbol | number,
  string | number | boolean | null | undefined
>;

export type TExcelSheetData = unknown[][];

export type TExcelSheet = {
  name: string;
  data: TExcelSheetData;
  filters: TFilter[];
};

export type TExcelData = TExcelSheet[];

export type TVariableField = {
  name: string;
  type: TVariableType;
  isFilter: boolean;
  label?: string;
};
