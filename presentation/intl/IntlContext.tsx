import { useContext, createContext, Dispatch, SetStateAction } from 'react';
import { TIntl } from '.';
import { TLocales } from './definitions';

type IntlContextProps = {
  intl: TIntl;
  setLocale: Dispatch<SetStateAction<TLocales>>;
};

export const IntlContext = createContext<IntlContextProps | undefined>(
  undefined
);

export const useIntlContext = () => {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error('useIntlContext must be used within an IntlProvider');
  }
  return context;
};
