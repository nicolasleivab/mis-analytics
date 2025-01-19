// Building block for the svg visualization
export type TSvgPart = {
  name: string;
  id: string;
  path: string;
  transform: string;
  className: string;
  innerClass: string;
  outerTransform: string;
  innerTransform: string;
  partTransform: string;
  activeColor?: string;
  inactiveColor?: string;
};

export type TClipPath = {
  id: string;
  className: string;
  d: string;
};
