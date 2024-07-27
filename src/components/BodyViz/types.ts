export type TBodyPartProps = {
  name: string;
  path: string;
  outerTransform: string;
  innerTransform: string;
  partTransform: string;
  className: string;
  onClick: () => void;
  innerClass: string;
  selected: boolean;
  bodyPartColors: {
    active: string;
    inactive: string;
  };
};
