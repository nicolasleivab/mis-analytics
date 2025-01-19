import { TSvgPartProps } from '../types';

const SvgPart = ({
  name,
  path,
  clipPath,
  outerTransform,
  innerTransform,
  partTransform,
  onClick,
  selected,
  svgPartColors: { activeColor, inactiveColor },
  className,
  innerClass,
}: TSvgPartProps) => (
  <g className={className} transform={outerTransform} id={name}>
    <g className={innerClass} transform={innerTransform}>
      <path
        className="b"
        d={path}
        clipPath={clipPath}
        onClick={onClick}
        style={{ fill: selected ? activeColor : inactiveColor }}
        transform={partTransform}
      />
    </g>
  </g>
);

export default SvgPart;
