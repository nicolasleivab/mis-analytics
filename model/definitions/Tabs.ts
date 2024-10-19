export type TTab = 'Overview' | 'Model Comparison';

export const OVERVIEW_TAB = 'Overview';
export const MODEL_COMPARISON_TAB = 'Model Comparison';

export const TABS: TTab[] = [OVERVIEW_TAB, MODEL_COMPARISON_TAB];

export type TView = {
  id: string;
};

export const FIRST_MODEL: TView = {
  id: '1',
};
