export type TStatLabel = 'Mean' | 'Median' | 'Min' | 'Max';
export type TStatId = 'mean' | 'median' | 'min' | 'max';

export type TStats = {
  svgPart: string;
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  isHighlighted: boolean;
};
