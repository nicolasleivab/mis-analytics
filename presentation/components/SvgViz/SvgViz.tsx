import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../presentation/theme';
import SvgPart from './SvgPart/SvgPart';
import { Flex } from '../../layout';
import { Box } from '@chakra-ui/react';
import { TStats } from '../../../model/definitions/Stats';
import { selectAllSvgParts, useAppSelector } from '../../../model';
import {
  selectAllClipPaths,
  selectUniqueSvgParts,
} from '../../../model/SvgViz/svgVizSelectors';

const DEFAULT_COLORS = {
  activeColor: '#4f5f77',
  inactiveColor: '#c4d8fc',
};

const DEFAULT_COLOR_SVG_PARTS = '#677a90';

const DEFAULT_VIEW_BOX = '0 0 200 200';

const DEFAULT_MARGIN = 20;

export default function SvgViz({
  onPartClick: makeClickHandler,
  selected,
  style,
  stats,
}: {
  onPartClick: (part: string) => void;
  selected: string[];
  style?: React.CSSProperties;
  stats: TStats[];
}) {
  const { theme } = useTheme();
  const svgParts = useAppSelector(selectAllSvgParts);
  const reduxUniqueParts = useAppSelector(selectUniqueSvgParts);
  const clipPaths = useAppSelector(selectAllClipPaths);

  const svgRef = useRef<SVGSVGElement>(null);

  // We'll store the computed bounding box in state
  const [viewBox, setViewBox] = useState<string | null>(null);

  type TSvgColorPart = string;

  type TSvgPartsInitialColors = Record<
    TSvgColorPart,
    { activeColor: string; inactiveColor: string }
  >;

  const initialColors = reduxUniqueParts.reduce((acc, part) => {
    acc[part] = {
      activeColor: DEFAULT_COLORS.activeColor,
      inactiveColor: DEFAULT_COLORS.inactiveColor,
    };
    return acc;
  }, {} as TSvgPartsInitialColors);

  const [svgPartColors, setSvgPartsColors] =
    useState<TSvgPartsInitialColors>(initialColors);

  useEffect(() => {
    const newColors: TSvgPartsInitialColors = { ...initialColors };

    stats.forEach((stat) => {
      let color;
      if (stat.median < 0.7) {
        color = '#8b0000'; // Dark Red
      } else if (stat.median >= 0.7 && stat.median < 0.85) {
        color = '#d4b200'; // Dark Yellow
      } else {
        color = '#006400'; // Dark Green
      }

      const partName = stat.svgPart.toLowerCase();

      if (newColors[partName]) {
        newColors[partName].activeColor = color;
        newColors[partName].inactiveColor = `${color}80`; // 50% transparency
      }
    });

    setSvgPartsColors(newColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, theme]);

  useEffect(() => {
    // After the first render, measure bounding box
    if (svgRef.current) {
      // We can measure the bounding box of the entire <svg> contents
      const bbox = svgRef.current.getBBox();
      const minX = bbox.x - DEFAULT_MARGIN;
      const minY = bbox.y - DEFAULT_MARGIN;
      const width = bbox.width + DEFAULT_MARGIN * 2;
      const height = bbox.height + DEFAULT_MARGIN * 2;

      setViewBox(`${minX} ${minY} ${width} ${height}`);
    }
  }, []);

  return (
    <div>
      <svg
        ref={svgRef}
        // if we don't have a computed viewBox yet, use some fallback
        viewBox={viewBox ?? DEFAULT_VIEW_BOX}
        style={style}
        width={400}
        height={600}
      >
        <defs>
          {clipPaths.map((clipItem) => (
            <clipPath id={clipItem.id} key={clipItem.id}>
              <path
                // This is the 'inner path' for the clip.
                d={clipItem.d}
                // transform={clipItem.transform}
                // If needed, you can add a fill or clipRule:
                fill={DEFAULT_COLOR_SVG_PARTS}
                clipRule="evenodd"
              />
            </clipPath>
          ))}
        </defs>
        {svgParts.map((part) => {
          // find the clip path object whose "className" matches part.className
          const foundClip = clipPaths.find(
            (cp) => cp.className === part.className
          );

          const clipPathUrl = foundClip ? `url(#${foundClip.id})` : undefined;

          return (
            <SvgPart
              key={part.id}
              name={part.name}
              path={part.path}
              clipPath={clipPathUrl ?? ''}
              outerTransform={part.outerTransform}
              innerTransform={part.innerTransform}
              className={part.className}
              innerClass={part.innerClass}
              onClick={() => makeClickHandler(part.name)}
              selected={selected.includes(part.name)}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              svgPartColors={svgPartColors[part.name]}
              partTransform={part.partTransform}
            />
          );
        })}
      </svg>
      <Flex direction="column" padding="20px">
        <Box>
          <strong>Legend:</strong>
        </Box>
        <Box>
          <span style={{ color: '#8b0000' }}>●</span> Median &lt; 0.7 (Dark Red)
        </Box>
        <Box>
          <span style={{ color: '#d4b200' }}>●</span> 0.7 ≤ Median &lt; 0.85
          (Dark Yellow)
        </Box>
        <Box>
          <span style={{ color: '#006400' }}>●</span> Median ≥ 0.85 (Dark Green)
        </Box>
      </Flex>
    </div>
  );
}
