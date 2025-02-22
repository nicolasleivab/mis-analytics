import { TDataFormat } from '../definitions';

const STANDARD_UNITS = ['number', 'decimal', 'percent', 'currency'];

export function isSpecialUnit(type: TDataFormat): boolean {
  return !STANDARD_UNITS.includes(type);
}
