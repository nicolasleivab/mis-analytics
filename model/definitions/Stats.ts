export type TStat = 'Mean' | 'Median' | 'Min' | 'Max';

export type TStats = {
  svgPart: string;
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  isHighlighted: boolean;
};
