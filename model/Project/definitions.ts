import { TStatId } from '../definitions/Stats';

// Building block for the svg visualization
export type TSvgPart = {
  name: string;
  id: string;
  path: string;
  transform: string;
  className: string;
  innerClass: string;
  outerTransform: string;
  innerTransform: string;
  partTransform: string;
  activeColor?: string;
  inactiveColor?: string;
};

export type TClipPath = {
  id: string;
  className: string;
  d: string;
};

export type TSvgThresholds = {
  stat: TStatId;
  values: number[];
};

export const DEFAULT_THRESHOLD: TSvgThresholds = {
  stat: 'median',
  values: [0.7, 0.85],
};

export type TSvgPartsData = {
  svgParts: TSvgPart[];
  clipPaths: TClipPath[];
};

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

export type TUpdateMode = 'updateTitle' | 'updateData';

export const UPDATE_OPTIONS: { value: TUpdateMode; label: string }[] = [
  { value: 'updateTitle', label: 'Update title' },
  { value: 'updateData', label: 'Add a new sheet' },
];
