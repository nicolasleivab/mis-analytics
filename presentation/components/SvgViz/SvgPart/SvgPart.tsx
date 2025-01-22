import { useDispatch } from 'react-redux';
import { TSvgPartProps } from '../types';
import {
  selectHoveredPart,
  setHoveredPart,
  useAppSelector,
} from '../../../../model';

export default function SvgPart({
  name,
  path,
  clipPath,
  outerTransform,
  innerTransform,
  partTransform,
  onClick,
  selected,
  svgPartColors: { activeColor, hoverColor, inactiveColor },
  className,
  innerClass,
}: TSvgPartProps) {
  const hoveredPart = useAppSelector(selectHoveredPart);
  const dispatch = useDispatch();

  const onMouseEnter = () => {
    dispatch(setHoveredPart(name));
  };

  const onMouseLeave = () => {
    dispatch(setHoveredPart(null));
  };

  return (
    <g
      className={className}
      transform={outerTransform}
      id={name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <g className={innerClass} transform={innerTransform}>
        <path
          className="b"
          d={path}
          clipPath={clipPath}
          onClick={onClick}
          style={{
            fill: getFillColor({
              selected,
              partIsHovered: hoveredPart === name,
              activeColor,
              inactiveColor,
              hoverColor,
            }),
          }}
          transform={partTransform}
        />
      </g>
    </g>
  );
}

function getFillColor({
  selected,
  partIsHovered,
  activeColor,
  inactiveColor,
  hoverColor,
}: {
  selected: boolean;
  partIsHovered: boolean;
  activeColor: string;
  inactiveColor: string;
  hoverColor: string;
}): string {
  if (partIsHovered) {
    return hoverColor;
  }

  if (selected) {
    return activeColor;
  }

  return inactiveColor;
}
