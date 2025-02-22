import { TInputDate, TLocales } from '../definitions';
import { TDateOptions } from './types';

export function formatDateMethod(
  date: TInputDate,
  locale: TLocales,
  options: TDateOptions
): string {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(newDate);
}
