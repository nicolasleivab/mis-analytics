import {
  TCurrencyCode,
  TDataFormat,
  TPrecision,
  TSignDisplay,
} from '../definitions';

export type TConversionUnits = 'g' | 'kg' | 't';

export type TNumberOptions = {
  type: TDataFormat;
  convertFrom?: TConversionUnits;
  precision?: TPrecision;
  compactDisplay?: boolean;
  signDisplay?: TSignDisplay;
  currencyCode?: TCurrencyCode;
};
