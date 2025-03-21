export type TSvgPartProps = {
  name: string;
  path: string;
  clipPath: string;
  outerTransform: string;
  innerTransform: string;
  partTransform: string;
  className: string;
  onClick: () => void;
  innerClass: string;
  selected: boolean;
  svgPartColors: {
    activeColor: string;
    inactiveColor: string;
    hoverColor: string;
  };
};
