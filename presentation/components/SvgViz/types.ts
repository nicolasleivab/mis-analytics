export type TSvgPartProps = {
  name: string;
  path: string;
  outerTransform: string;
  innerTransform: string;
  partTransform: string;
  className: string;
  onClick: () => void;
  innerClass: string;
  selected: boolean;
  svgPartColors: {
    active: string;
    inactive: string;
  };
};
