export type TExcelSheet = {
  name: string;
  data: unknown[][];
};

export type TExcelData = TExcelSheet[];

export type TVariableType = 'id' | 'numeric' | 'category';
export type TVariableField = {
  name: string;
  type: TVariableType;
  label?: string;
};
