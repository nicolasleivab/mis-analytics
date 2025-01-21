export type TVariableType = 'id' | 'numeric' | 'category';

export type TCategoricalValues = string[];

export type TNumericRange = [number, number];

export type TFilter = {
  type: TVariableType;
  values?: TCategoricalValues;
  range?: TNumericRange;
};

export type TExcelSheet = {
  name: string;
  data: unknown[][];
  filters: TFilter[];
};

export type TExcelData = TExcelSheet[];

export type TVariableField = {
  name: string;
  type: TVariableType;
  isFilter: boolean;
  label?: string;
};
