import { TSvgPartProps } from '../types';

const SvgPart = ({
  name,
  path,
  outerTransform,
  innerTransform,
  partTransform,
  onClick,
  selected,
  svgPartColors: { active, inactive },
  className,
  innerClass,
}: TSvgPartProps) => (
  <g className={className} transform={outerTransform} id={name}>
    <g className={innerClass} transform={innerTransform}>
      <path
        className="b"
        d={path}
        onClick={onClick}
        style={{ fill: selected ? active : inactive }}
        transform={partTransform}
      />
    </g>
  </g>
);

export default SvgPart;
