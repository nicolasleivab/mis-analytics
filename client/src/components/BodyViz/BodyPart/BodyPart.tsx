import { TBodyPartProps } from "../types";

const BodyPart = ({
  name,
  path,
  outerTransform,
  innerTransform,
  partTransform,
  onClick,
  selected,
  bodyPartColors: { active, inactive },
  className,
  innerClass,
}: TBodyPartProps) => (
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

export default BodyPart;
