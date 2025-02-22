export const ID_FIELD = 'id';

export const DEFAULT_ALL_FIELD = {
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

export const DATE_FIELDS = ['createdAt', 'updatedAt'];
