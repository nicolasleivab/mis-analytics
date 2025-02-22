import { useState, useEffect, ReactNode } from 'react';
import { createIntl } from '.';
import { LOCALES, TLocales } from './definitions';
import { IntlContext } from './IntlContext';

export function IntlProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<TLocales>(() => {
    // Load initial locale from local storage

    const storedLocale = localStorage.getItem('locale');
    return (storedLocale as TLocales) || LOCALES[0];
  });

  const [intl, setIntl] = useState(() => createIntl(locale));

  useEffect(() => {
    const intl = createIntl(locale);
    setIntl(intl);

    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <IntlContext.Provider value={{ intl, setLocale }}>
      {children}
    </IntlContext.Provider>
  );
}
