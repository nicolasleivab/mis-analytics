export type TDateOptions = {
  year?: '2-digit' | 'numeric';
  month?: '2-digit' | 'numeric' | 'narrow' | 'short' | 'long';
  day?: '2-digit' | 'numeric';
  weekday?: 'narrow' | 'short' | 'long';
  dayPeriod?: 'narrow' | 'short' | 'long';
  hour?: '2-digit' | 'numeric';
  minute?: '2-digit' | 'numeric';
  second?: '2-digit' | 'numeric';
  fractionalSecondDigits?: 1 | 2 | 3;
  era?: 'narrow' | 'short' | 'long';
  timeZoneName?:
    | 'short'
    | 'long'
    | 'shortOffset'
    | 'longOffset'
    | 'shortGeneric'
    | 'longGeneric';
};
