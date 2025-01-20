export const ID_FIELD = 'id';

export const DEFAUT_ALL_FIELD = {
  value: 'All',
  label: 'All',
};

export type TField = {
  label?: string;
  name: string;
  key?: string;
  fieldType?: {
    type: string;
  };
  example?: string;
};
