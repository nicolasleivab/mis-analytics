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
