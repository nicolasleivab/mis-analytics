import {
  DEFAULT_DATE_OPTIONS,
  DEFAULT_NUMBER_OPTIONS,
  TInputDate,
  TLocales,
} from './definitions';
import { formatDateMethod } from './formatDate/formatDate';
import { formatNumberMethod } from './formatNumber/formatNumber';
import { LOCALES } from './definitions';

// Import locale messages
import enUSMessages from './locales/en.json';
import { getMessageFromNestedKey } from './utils';
import { TNumberOptions } from './formatNumber/types';
import { TDateOptions } from './formatDate/types';

const MESSAGES = {
  [LOCALES[0]]: enUSMessages,
};

export type TIntl = {
  formatNumber: (num: number, options?: TNumberOptions) => string;
  formatDate: (date: TInputDate, options?: TDateOptions) => string;
  formatMessage: (messageKey: string) => string;
};

export function createIntl(locale: TLocales = LOCALES[0]): TIntl {
  const messages = MESSAGES[locale];

  return {
    formatNumber: function (num, options) {
      return formatNumberMethod(num, locale, {
        type: options?.type ?? DEFAULT_NUMBER_OPTIONS.type,
        convertFrom: options?.convertFrom,
        precision: options?.precision ?? DEFAULT_NUMBER_OPTIONS.precision,
        compactDisplay:
          options?.compactDisplay ?? DEFAULT_NUMBER_OPTIONS.compactDisplay,
        signDisplay: options?.signDisplay ?? DEFAULT_NUMBER_OPTIONS.signDisplay,
        currencyCode:
          options?.currencyCode ?? DEFAULT_NUMBER_OPTIONS.currencyCode,
      });
    },

    formatDate: function (date, options) {
      return formatDateMethod(date, locale, {
        year: options?.year ?? DEFAULT_DATE_OPTIONS.year,
        month: options?.month ?? DEFAULT_DATE_OPTIONS.month,
        day: options?.day ?? DEFAULT_DATE_OPTIONS.day,
      });
    },

    formatMessage: function (messageKey) {
      const message = getMessageFromNestedKey(messages, messageKey) as string;

      return message ?? messageKey;
    },
  };
}

export { IntlProvider } from './IntlProvider';
