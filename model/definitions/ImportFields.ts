export const EXTRA_STATS = [
  { name: 'dice', example: '0.76' },
  { name: 'hd', example: '45.32' },
  { name: 'hd95', example: '4.81' },
];
export const EXTRA_FIELDS = [
  { name: 'id', example: '001' },
  { name: 'name', example: 'John Doe' },
  { name: 'sex', example: 'M' },
  { name: 'height', example: '181' },
  { name: 'weight', example: '120' },
  { name: 'age', example: '25' },
  ...EXTRA_STATS,
];

export const HEADERS = [
  'name',
  'id',
  'sex',
  'height',
  'head score',
  'thorax score',
  'abdomen score',
  'lower-abdomen and pelvis score',
  'dice',
  'hd',
  'hd95',
];

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
