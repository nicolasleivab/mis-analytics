import { TPrecision } from '../definitions';

export function roundNumber(num: number, precision: TPrecision = 2): number {
  const computedPrecision = Math.pow(10, precision);

  return (
    Math.round((num + Number.EPSILON) * computedPrecision) / computedPrecision
  );
}
