import { TDateOptions } from './formatDate/types';
import { TNumberOptions } from './formatNumber/types';

// Based on native intl https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
export type TPrecision = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type TInputDate = Date | number | string;
export type TCurrencyCode = string;
export type TLocales = 'en-US' | 'de-DE';
export type TSignDisplay = 'auto' | 'always' | 'never' | 'exceptZero';
export type TGetUnitLabelOptions = {
  currencyCode?: TCurrencyCode;
  value?: number;
};
export type TDataFormat =
  | 'decimal'
  | 'number'
  | 'currency'
  | 'millimeter'
  | 'centimeter'
  | 'gram'
  | 'kilogram'
  | 'meter'
  | 'kilometer'
  | 'celsius'
  | 'gCO2e'
  | 'kgCO2e'
  | 'tCO2e'
  | 'dynamicCO2e'
  | 'dynamicDecimal'
  | 'eco-score'
  | 'acre'
  | 'bit'
  | 'byte'
  | 'day'
  | 'degree'
  | 'fahrenheit'
  | 'fluid-ounce'
  | 'foot'
  | 'gallon'
  | 'gigabit'
  | 'gigabyte'
  | 'hectare'
  | 'hour'
  | 'inch'
  | 'kilobit'
  | 'kilobyte'
  | 'liter'
  | 'megabit'
  | 'megabyte'
  | 'mile'
  | 'mile-scandinavian'
  | 'milliliter'
  | 'millisecond'
  | 'minute'
  | 'month'
  | 'ounce'
  | 'percent'
  | 'petabyte'
  | 'pound'
  | 'second'
  | 'stone'
  | 'terabit'
  | 'terabyte'
  | 'week'
  | 'yard'
  | 'year'
  | 'scientific-notation';

export const PRECISION_VALUES = [0, 1, 2, 3, 4, 5, 6];

// Keep in mind that Intl.DateTimeFormat formats dates based on locale conventions
export const DATE_OPTIONS = {
  year: ['2-digit', 'numeric'],
  month: ['2-digit', 'numeric', 'narrow', 'short', 'long'],
  day: ['2-digit', 'numeric'],
  weekday: ['narrow', 'short', 'long'],
  dayPeriod: ['narrow', 'short', 'long'],
  hour: ['2-digit', 'numeric'],
  minute: ['2-digit', 'numeric'],
  second: ['2-digit', 'numeric'],
  fractionalSecondDigits: [1, 2, 3],
  era: ['narrow', 'short', 'long'],
  timeZoneName: [
    'short',
    'long',
    'shortOffset',
    'longOffset',
    'shortGeneric',
    'longGeneric',
  ],
};

export const INPUT_DATE_TYPES = ['Date', 'number', 'string'];

export const CURRENCY_CODES = ['CLP', 'USD', 'EUR']; // ... and many more

export const LOCALES: TLocales[] = ['de-DE', 'en-US']; // ... and many more

export const SIGN_DISPLAY = ['auto', 'always', 'never', 'exceptZero'];

export const COMPACT_NUMBER_DISPLAY = [true, false];

export const DATA_FORMAT = [
  'decimal',
  'number',
  'currency',
  'millimeter',
  'centimeter',
  'gram',
  'kilogram',
  'meter',
  'kilometer',
  'celsius',
  'gCO2e',
  'kgCO2e',
  'tCO2e',
  'dynamicCO2e',
  'dynamicDecimal',
  'eco-score',
  'acre',
  'bit',
  'byte',
  'day',
  'degree',
  'fahrenheit',
  'fluid-ounce',
  'foot',
  'gallon',
  'gigabit',
  'gigabyte',
  'hectare',
  'hour',
  'inch',
  'kilobit',
  'kilobyte',
  'liter',
  'megabit',
  'megabyte',
  'mile',
  'mile-scandinavian',
  'milliliter',
  'millisecond',
  'minute',
  'month',
  'ounce',
  'percent',
  'petabyte',
  'pound',
  'second',
  'stone',
  'terabit',
  'terabyte',
  'week',
  'yard',
  'year',
  'scientific-notation',
];

export const DEFAULT_NUM_TYPE = 'decimal';
export const DEFAULT_PRECISION = 2;
export const DEFAULT_COMPACT_DISPLAY = true;
export const DEFAULT_SIGN_DISPLAY = 'auto';
export const DEFAULT_CURRENCY_CODE = 'EUR';
export const DEFAULT_MAX_FRACTION_DIGITS = 2;

export const DEFAULT_NUMBER_OPTIONS: TNumberOptions = {
  type: DEFAULT_NUM_TYPE,
  precision: DEFAULT_PRECISION,
  compactDisplay: DEFAULT_COMPACT_DISPLAY,
  signDisplay: DEFAULT_SIGN_DISPLAY,
  currencyCode: DEFAULT_CURRENCY_CODE,
};

export const DEFAULT_YEAR_FORMAT = 'numeric';
export const DEFAULT_MONTH_FORMAT = 'short';
export const DEFAULT_DAY_FORMAT = 'numeric';

export const DEFAULT_DATE_OPTIONS: TDateOptions = {
  year: DEFAULT_YEAR_FORMAT,
  month: DEFAULT_MONTH_FORMAT,
  day: DEFAULT_DAY_FORMAT,
};
